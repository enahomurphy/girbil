/* eslint-disable class-methods-use-this */
import {
  Mutation,
  Arg,
  Root,
  Resolver,
  FieldResolver,
  ResolverInterface,
  Ctx,
  Authorized,
  Query,
} from 'type-graphql';
import { getCustomRepository, getRepository } from 'typeorm';
import short from 'short-uuid';
import { plainToClass } from 'class-transformer';

import { UserRepo, OrganizationRepo } from '../../repo';
import {
  Organization, Invite, UserOrganization, Share,
} from '../../entity';
import { isValidPassword } from '../../utils/password';
import { getGoogleUser } from '../../services/google';
import { sign, inviteToken } from '../../utils/jwt';
import {
  LoginInput, SocialInput, InviteInput,
} from './auth.input';
import { UserInput } from '../user/user.input';
import { AuthType, InviteOrganization } from './auth.type';
import { ContextType } from '../../interfaces';
import { sendInvites } from '../../services/email';
import { keys } from '../../config';
import { handleEmailInvite, handleInvite, tokenForOrgId } from './heplers';
const orgRepo = getCustomRepository(OrganizationRepo);

@Resolver(AuthType)
class AuthResolver implements ResolverInterface<AuthType> {
  private readonly userRepo = getCustomRepository(UserRepo);

  private readonly orgRepo = getCustomRepository(OrganizationRepo);

  private readonly inviteRepo = getRepository(Invite);

  private readonly userOrgRepo = getRepository(UserOrganization);

  private readonly shareRepo = getRepository(Share);

  @Mutation(() => AuthType)
  async signup(@Arg('input') { email, password, name }: UserInput): Promise<AuthType> {
    const user = await this.userRepo.findByEmail(email);

    if (user) {
      delete user.password;
      return AuthType.createAuth(sign(user));
    }

    const insertedUser = await this.userRepo.createUser(
      email,
      name || '',
      password,
    );

    return AuthType.createAuth(sign(insertedUser.user), insertedUser.user);
  }

  @Mutation(() => AuthType)
  async login(@Arg('input') { email, password }: LoginInput): Promise<AuthType> {
    const user = await this.userRepo.findByEmail(email);

    if (!user || !isValidPassword(password, user.password)) {
      throw new Error('Invalid email or password');
    }

    return AuthType.createAuth(sign(user.user), user.user);
  }

  @FieldResolver({ nullable: true })
  async organizations(@Root() auth: AuthType): Promise<Organization[]> {
    return this.orgRepo.findUserOrganizations(auth.user.id);
  }

  @Authorized()
  @Query(() => AuthType, { description: 'logs in user to an organization by creating an organization auth token' })
  async organizationLogin(
    @Arg('organizationId') organizationId: string,
      @Ctx() { user, res }: ContextType,
  ): Promise<AuthType> {
    const org = await this.orgRepo.findUserOrganization(
      user.id,
      organizationId,
    );

    if (!org) {
      res.status(403);
      throw new Error('You do not belong to this organization');
    }

    const newUser = user.user;
    newUser.organization = org.organization;

    return AuthType.createAuth(sign(newUser), newUser);
  }

  @Mutation(() => AuthType)
  async social(@Arg('input') {
    accessToken, inviteId, emailToken,
  }: SocialInput): Promise<AuthType> {
    const googleUser = await getGoogleUser(accessToken);

    if (emailToken) {
      const invite: Invite = await tokenForOrgId(emailToken);

      if (!invite || (invite.email !== googleUser.email)) {
        throw new Error('Invite id not found');
      }
    }

    const user = await this.userRepo.findOrCreateGoogleUser(
      googleUser.email,
      googleUser.avatar,
      googleUser.name,
      googleUser.verified,
    );

    if (inviteId) {
      const org = await handleInvite(user.id, inviteId);
      user.organization = org;
    }

    if (emailToken) {
      const org = await handleEmailInvite(user.id, emailToken);
      user.organization = org;
    }

    return AuthType.createAuth(sign(user.user), user.user);
  }

  @Authorized('admin', 'owner')
  @Mutation(() => String, { nullable: true })
  async invite(@Arg('input') { emails }: InviteInput, @Ctx() { user }: ContextType): Promise<string> {
    const organization = await this.orgRepo.findOne({ where: { id: user.organization.id } });

    let invites = Array.from(new Set(emails)).map((email) => ({
      email,
      organizationId: organization.id,
    }));

    const findInviteQuery = await this.inviteRepo.createQueryBuilder('invites');

    // @TODO make sure user does not already belong to the organization
    // we don't want to send user invite if the user already joined the organization

    invites.forEach(({ email, organizationId: orgId }) => {
      findInviteQuery.orWhere('email = :email and organization_id = :orgId ', { email, orgId });
    });

    const existingInvites = await findInviteQuery.getMany();

    if (existingInvites.length) {
      const map = new Map();

      existingInvites.forEach(({ email, organizationId: orgId }) => {
        map.set(orgId, email);
      });

      invites = invites.filter(({ email, organizationId: orgId }) => !(
        map.has(orgId) && map.get(orgId) === email));
    }

    if (invites.length) {
      const createdInvites = await this.inviteRepo.insert(invites);
      const inviteEmails = createdInvites.generatedMaps.map((invite, index) => ({
        email: invites[index].email,
        token: encodeURIComponent(inviteToken(`${invite.id}+${organization.id}`)),
        organization,
      }));

      sendInvites(inviteEmails);
    }

    return 'sent';
  }

  @Authorized('admin', 'owner')
  @Query(() => String)
  async inviteUrl(
    @Ctx() { user: { organization } }: ContextType,
  ): Promise<string> {
    let share: Share = await this.shareRepo.findOne({ where: { organizationId: organization.id } });
    const translator = short();

    if (!share) {
      share = new Share();
      share.id = short.uuid();
      share.organizationId = organization.id;

      await this.shareRepo.save(share);
    }

    const hash = translator.fromUUID(share.id);

    return `${keys.url}/invite/accept?inviteId=${hash}`;
  }

  @Query(() => InviteOrganization)
  async inviteUrlOrganization(
    @Arg('inviteId', { nullable: true }) inviteId: string,
      @Arg('emailToken', { nullable: true }) emailToken: string,
  ): Promise<InviteOrganization> {
    let organizationId: string;

    if (inviteId) {
      const translator = short();
      const shareId = translator.toUUID(inviteId);

      const share = await this.shareRepo.findOne({ where: { id: shareId } });
      organizationId = share.organizationId;

      if (!share) {
        throw new Error('Invite id not found');
      }
    }

    if (emailToken) {
      const invite = await tokenForOrgId(emailToken);

      organizationId = invite.organizationId;
    }

    const organization = await this.orgRepo.findOne({ where: { id: organizationId } });

    if (!organization) {
      throw new Error('Invite id not found');
    }

    return plainToClass(InviteOrganization, organization);
  }
}

export default AuthResolver;

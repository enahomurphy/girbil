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

import { UserRepo, OrganizationRepo } from '../../repo';
import { Organization, Invite, UserOrganization } from '../../entity';
import { isValidPassword } from '../../utils/password';
import { getGoogleUser } from '../../services/google';
import { sign, inviteToken } from '../../utils/jwt';
import { LoginInput, SocialInput, InviteInput } from './auth.input';
import { UserInput } from '../user/user.input';
import { AuthType } from './auth.type';
import { InviteEmails, ContextType } from '../../interfaces';
import { sendInvites } from '../../services/email';

@Resolver(AuthType)
class AuthResolver implements ResolverInterface<AuthType> {
  private readonly userRepo = getCustomRepository(UserRepo);

  private readonly orgRepo = getCustomRepository(OrganizationRepo);

  private readonly inviteRepo = getRepository(Invite);

  private readonly userOrgRepo = getRepository(UserOrganization);

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

    delete insertedUser.password;
    return AuthType.createAuth(sign(user));
  }

  @Mutation(() => AuthType)
  async login(@Arg('input') { email, password }: LoginInput): Promise<AuthType> {
    const user = await this.userRepo.findByEmail(email);

    if (!user || !isValidPassword(password, user.password)) {
      throw new Error('Invalid email or password');
    }

    delete user.password;
    return AuthType.createAuth(sign(user));
  }

  @Mutation(() => AuthType)
  async social(@Arg('input') { accessToken }: SocialInput): Promise<AuthType> {
    const googleUser = await getGoogleUser(accessToken);

    const user = await this.userRepo.findOrCreateGoogleUser(
      googleUser.email,
      googleUser.avatar,
      googleUser.name,
      googleUser.verified,
    );

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
      const createdInvites: InviteEmails = await this.inviteRepo.insert(invites);
      const inviteEmails = createdInvites.generatedMaps.map((invite, index) => ({
        email: invites[index].email,
        token: inviteToken(`${invite.id}+${invite.organizationId}`),
        organization,
      }));

      sendInvites(inviteEmails);
    }

    return 'sent';
  }

  @FieldResolver()
  async organizations(@Root() auth: AuthType): Promise<Organization[]> {
    return this.orgRepo.findUserOrganizations(auth.user.id);
  }


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
      res.status('403');
      throw new Error('You do not belong to this organization');
    }

    const newUser = user.user;
    newUser.organization = org.organization;

    return AuthType.createAuth(sign(newUser), newUser);
  }
}

export default AuthResolver;

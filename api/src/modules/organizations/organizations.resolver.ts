import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  Arg,
  Mutation,
  ResolverInterface,
  FieldResolver,
  Root,
  registerEnumType,
  Args,
} from 'type-graphql';
import { getCustomRepository, getRepository, Not } from 'typeorm';
import { plainToClass } from 'class-transformer';

import {
  Organization, User, UserOrganization, RoleType, Channel
} from '../../entity';
import { ContextType, SearchResult } from '../../interfaces';
import { OrganizationRepo } from '../../repo';
import { CreateOrganizationType, SearchType } from './organization.type';
import { sign } from '../../utils/jwt';
import { CanView } from '../../middleware/permissions';
import { UserIDArgs } from '../user/user.args';
import { OrgSearchArgs } from './organization.args';


registerEnumType(RoleType, {
  name: 'RoleType',
});

@Resolver(Organization)
class OrganizationResolver {
  private readonly orgRepo = getCustomRepository(OrganizationRepo);

  @Authorized()
  @Query(() => [Organization])
  async organizations(@Ctx() { user }: ContextType): Promise<Organization[]> {
    return this.orgRepo.findUserOrganizations(user.id);
  }

  @Authorized('user', 'admin', 'owner')
  @Query(() => [SearchType])
  async searchOrganization(
    @Args() { text }: OrgSearchArgs,
      @Ctx() { user: { organization } }: ContextType,
  ): Promise<SearchResult[]> {
    return this.orgRepo.search(
      organization.id,
      text,
    );
  }

  @Authorized('owner', 'admin', 'user')
  @CanView('organization')
  @Query(() => Organization, { nullable: true })
  async organization(
    @Arg('organizationId', { nullable: true }) organizationId: string,
      @Ctx() { user: { organization } }: ContextType,
  ): Promise<Organization> {
    return this.orgRepo.findOne({ where: { id: organizationId || organization.id } });
  }

  @Authorized()
  @Query(() => Organization, { nullable: true })
  async organizationByDomain(@Arg('domain') domain: string): Promise<Organization> {
    const organization = await this.orgRepo.findOne({ where: { domain } });
    return organization || null;
  }

  @Authorized('admin', 'owner')
  @Query(() => [UserOrganization])
  async organizationUsers(@Ctx() { user }: ContextType): Promise<UserOrganization[]> {
    return this.orgRepo.orgUsers(user.organization.id);
  }

  @Authorized('admin', 'owner')
  @Mutation(() => String)
  async changUserRole(
    @Arg('role', () => RoleType) role: RoleType,
      @Args() { userId }: UserIDArgs,
      @Ctx() { user: { organization } }: ContextType,
  ): Promise<string> {
    const orgUser = await this.orgRepo.hasUser(
      organization.id,
      userId,
    );

    if (!orgUser) {
      throw new Error('User done not exist');
    }


    if (orgUser.role === RoleType.OWNER) {
      throw new Error('Cannot update, user is an owner');
    }

    if (organization.role !== RoleType.OWNER && role === RoleType.OWNER) {
      throw new Error('Only owner can make another user an owner');
    }

    await this.orgRepo.changeRole(
      organization.id,
      userId,
      role,
    );

    return 'User role updated';
  }

  @Authorized()
  @Mutation(() => CreateOrganizationType)
  async addOrganization(
    @Arg('name') name: string,
      @Arg('domain') domain: string,
      @Ctx(){ user }: ContextType,
  ): Promise<CreateOrganizationType> {
    const organization = await this.orgRepo.createOrganization(name.toLowerCase(), domain, user);

    return CreateOrganizationType.create(organization);
  }

  @Authorized()
  @Mutation(() => Organization)
  async updateOrganization(
    @Arg('domain', { nullable: true }) domain: string,
      @Arg('name', { nullable: true }) name: string,
      @Ctx(){ user: { organization } }: ContextType,
  ): Promise<Organization> {
    const organizationUpdate = this.orgRepo.create();

    if (domain) {
      const org = await this.orgRepo.findOne({ where: { domain, id: Not(organization.id) } });

      if (org) {
        throw new Error('Domain name not available');
      }

      organizationUpdate.domain = domain.toLowerCase();
    }

    if (name) {
      organizationUpdate.name = name.toLowerCase();
    }

    await this.orgRepo.update(({ id: organization.id }), organizationUpdate);

    return plainToClass(Organization, {
      ...organization,
      ...organizationUpdate,
    });
  }
}

@Resolver(CreateOrganizationType)
export class CreateOrganizationTypeResolver implements ResolverInterface<CreateOrganizationType> {
  private readonly userOrgRepo = getRepository(UserOrganization);

  @FieldResolver()
  async token(@Root() org: CreateOrganizationType, @Ctx() { user }: ContextType): Promise<string> {
    const userOrg = await this.userOrgRepo.findOne({
      where: {
        userId: user.id,
        organizationId: org.organization.id,
      },
    });

    const { id, domain } = org.organization;
    const tokenOrg = plainToClass(Organization, {
      id,
      domain,
      role: userOrg.role,
      name: org.organization.name,
    });
    const tokenPayload = sign(plainToClass(User, { ...user, organization: tokenOrg }));
    return tokenPayload;
  }
}

export default OrganizationResolver;

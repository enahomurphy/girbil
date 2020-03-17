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
} from 'type-graphql';
import { getCustomRepository, getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { IsUUID } from 'class-validator';
import {
  Organization, User, UserOrganization, RoleType,
} from '../../entity';
import { ContextType } from '../../interfaces';
import { OrganizationRepo } from '../../repo';
import { CreateOrganizationType } from './organization.type';
import { sign } from '../../utils/jwt';
import { CanView } from '../../middleware/permissions';


registerEnumType(RoleType, {
  name: 'RoleType',
});

@Resolver(Organization)
class OrganizationResolver implements ResolverInterface<Organization> {
  private readonly orgRepo = getCustomRepository(OrganizationRepo);

  @Authorized()
  @Query(() => [Organization])
  async organizations(@Ctx() { user }: ContextType): Promise<Organization[]> {
    return this.orgRepo.findUserOrganizations(user.id);
  }

  @Authorized('owner', 'admin', 'user')
  @CanView('organization')
  @Query(() => Organization, { nullable: true })
  async organization(@Arg('organizationId') @IsUUID() organizationId: string): Promise<Organization> {
    const organization = await this.orgRepo.findOne({ where: { id: organizationId } });
    return organization || null;
  }

  @Authorized()
  @Query(() => Organization, { nullable: true })
  async organizationByDomain(@Arg('domain') domain: string): Promise<Organization> {
    const organization = await this.orgRepo.findOne({ where: { domain } });
    return organization || null;
  }

  @Authorized()
  @Query(() => Organization, { nullable: true })
  async createOrganizationDomain(
    @Arg('domain') domain: string, @Ctx(){ user }: ContextType,
  ): Promise<CreateOrganizationType> {
    const organization = await this.orgRepo.findOne({ where: { domain } });

    if (!organization) {
      throw new Error('Organization does not exist');
    }

    if (organization.domain) {
      throw new Error("Domain already exist and can't be changed");
    }

    const newOrg = await this.orgRepo.update({ domain });
    const tokenPayload = sign(plainToClass(User, { ...user, organization: newOrg }));

    return CreateOrganizationType.create(tokenPayload, newOrg);
  }


  @Authorized()
  @Query(() => [UserOrganization])
  async organizationUsers(@Ctx() { user }: ContextType): Promise<UserOrganization[]> {
    return this.orgRepo.orgUsers(user.organization.id);
  }

  @Authorized('admin', 'owner')
  @Mutation(() => String)
  async changUserRole(
    @Arg('role', () => RoleType) role: RoleType,
      @Arg('userId') @IsUUID() userId: string,
      @Ctx() { user: { organization } }: ContextType,
  ): Promise<string> {
    await this.changUserRole(
      organization.id,
      userId,
      role,
    );
    return 'User role updates';
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
}

@Resolver(CreateOrganizationType)
export class CreateOrganizationTypeResolver implements ResolverInterface<CreateOrganizationType> {
  private readonly userOrgRepo = getRepository(UserOrganization);

  @FieldResolver()
  async token(@Root() org: CreateOrganizationType, @Ctx(){ user }: ContextType): string {
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

// @Authorized('admin', 'owner')
// @Mutation(() => String)
// async deleteUser(
//   @Arg('userId') @IsUUID() userId: string,
//     @Ctx() { user: { id, organization } }: ContextType,
// ): Promise<string> {
//   const user = await this.orgRepo.hasUser(userId, organization.id);

//   if (!user) {
//     throw new Error('User does not exist');
//   }

//   if (user.userId === userId || user.role === RoleType.OWNER) {
//     throw new Error('User cannot be removed');
//   }

//   //

//   await this.orgRepo.deleteUser(organization.id, userId);

//   return 'user has been removed for organization';
// }

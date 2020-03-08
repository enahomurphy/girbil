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
} from 'type-graphql';
import { getCustomRepository, getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { Organization, User, UserOrganization } from '../../entity';
import { ContextType } from '../../interfaces';
import { OrganizationRepo } from '../../repo';
import { CreateOrganizationType } from './organization.type';
import { sign } from '../../utils/jwt';

@Resolver(Organization)
class OrganizationResolver implements ResolverInterface<Organization> {
  private readonly orgRepo = getCustomRepository(OrganizationRepo);

  @Authorized()
  @Query(() => [Organization])
  async organizations(@Ctx() { user }: ContextType): Promise<Organization[]> {
    return this.orgRepo.findUserOrganizations(user.id);
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

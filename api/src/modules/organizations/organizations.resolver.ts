
import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  Arg,
  Mutation,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { Organization, User } from '../../entity';
import { ContextType } from '../../interfaces';
import { OrganizationRepo } from '../../repo';
import { CreateOrganizationType } from './organization.type';
import { sign } from '../../utils/jwt';

@Resolver(Organization)
class UserResolver {
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
    const tokenOrg = plainToClass(Organization, { id: organization.id });
    const tokenPayload = sign(plainToClass(User, { ...user, organization: tokenOrg }));

    return CreateOrganizationType.create(tokenPayload, organization);
  }
}

export default UserResolver;

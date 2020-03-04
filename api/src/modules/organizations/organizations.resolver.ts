
import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  Arg,
  Mutation,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { Organization } from '../../entity';
import { ContextType } from '../../interfaces';
import { OrganizationRepo } from '../../repo';

@Resolver(Organization)
class UserResolver {
  private readonly orgRepo = getCustomRepository(OrganizationRepo);

  @Authorized()
  @Query(() => [Organization])
  async organizations(@Ctx() { user }: ContextType): Promise<Organization[]> {
    return this.orgRepo.findUserOrganizations(user.id);
  }

  @Authorized()
  @Query(() => Organization, { description: 'find organization matching query domain' })
  async organizationByDomain(@Arg('domain') domain: string): Promise<Organization> {
    const organization = await this.orgRepo.findOne({ where: { domain } });
    return organization || {};
  }

  @Authorized()
  @Mutation(() => Organization)
  async addOrganization(
    @Arg('name') name: string, @Ctx(){ user }: ContextType,
  ): Promise<Organization> {
    return this.orgRepo.createOrganization(name, user);
  }
}

export default UserResolver;

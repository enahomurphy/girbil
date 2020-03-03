
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
  @Mutation(() => Organization)
  async addOrganization(
    @Arg('name') name?: string, @Ctx(){ user }: ContextType,
  ): Promise<Organization> {
    return this.orgRepo.createOrganization(name, user);
  }
}

export default UserResolver;

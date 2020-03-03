
import {
  Resolver,
  Query,
  Authorized,
  Ctx,
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
}

export default UserResolver;

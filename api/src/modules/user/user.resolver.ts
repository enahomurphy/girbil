/* eslint-disable class-methods-use-this */

import {
  Resolver,
  Query,
  Authorized,
  Arg,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import { IsUUID } from 'class-validator';

import { CanView } from '../../middleware/permissions';
import { User } from '../../entity';
import { UserRepo, OrganizationRepo } from '../../repo';

@Resolver(User)
class UserResolver {
  private readonly userRepo = getCustomRepository(UserRepo);

  private readonly orgRepo = getCustomRepository(OrganizationRepo);

  @Authorized('user', 'owner', 'admin')
  @CanView('user')
  @Query(() => User, { nullable: true })
  async user(
    @Arg('userId') @IsUUID() userId: string,
  ): Promise<User> {
    return (await this.userRepo.findOne(userId)).user;
  }

  @FieldResolver()
  async organization(
    @Root() user: User,
      @Ctx() { user: { organization } },
  ): Promise<Organization> {
    return this.orgRepo.findUserOrganization(user.id, organization.id);
  }
}

export default UserResolver;

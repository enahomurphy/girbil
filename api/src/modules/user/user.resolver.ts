/* eslint-disable class-methods-use-this */
import {
  Resolver,
  Query,
  Authorized,
  Arg,
  FieldResolver,
  Root,
  Ctx,
  Mutation,
} from 'type-graphql';
import { getCustomRepository, getRepository } from 'typeorm';
import { IsUUID } from 'class-validator';

import { ContextType } from '../../interfaces';
import { CanView, CanEdit } from '../../middleware/permissions';
import { User, UserOrganization } from '../../entity';
import { UserRepo, OrganizationRepo } from '../../repo';
import { UserUpdateInput } from './user.input';

@Resolver(User)
class UserResolver {
  private readonly userRepo = getCustomRepository(UserRepo);

  private readonly orgRepo = getCustomRepository(OrganizationRepo);

  private readonly userOrgRepo = getRepository(UserOrganization);

  @Authorized('user', 'owner', 'admin')
  @CanView('user')
  @Query(() => User, { nullable: true })
  async user(
    @Arg('userId') @IsUUID() userId: string,
  ): Promise<User> {
    return (await this.userRepo.findOne(userId)).user;
  }

  @FieldResolver({ nullable: true })
  async organization(
    @Root() user: User,
      @Ctx() { user: { organization } },
  ): Promise<Organization> {
    return this.orgRepo.findUserOrganization(user.id, organization.id);
  }

  @Authorized('user', 'owner', 'admin')
  @CanEdit('user')
  @Mutation(() => String)
  async updateUser(
    @Arg('input') { name, position }: UserUpdateInput,
      @Arg('userId') @IsUUID userId: string,
      @Ctx() { user: { organization } }: ContextType,
  ): Promise<string> {
    const promises = [];
    const user = {};

    if (position) {
      promises.push(
        this.userOrgRepo.update({ userId, organizationId: organization.id }, {
          position,
        }),
      );
    }

    if (name) {
      user.name = name;
    }

    if (Object.keys(user).length) {
      promises.push(
        this.userRepo.update({ id: userId }, user),
      );
    }

    if (promises.length) {
      await Promise.all(promises);
    }
    return 'user updated';
  }
}

export default UserResolver;

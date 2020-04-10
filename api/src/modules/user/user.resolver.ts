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
  Args,
} from 'type-graphql';
import { getCustomRepository, getRepository } from 'typeorm';

import { ContextType } from '../../interfaces';
import { CanView, CanEdit } from '../../middleware/permissions';
import { User, UserOrganization, UserSetting, Organization } from '../../entity';
import { UserRepo, OrganizationRepo } from '../../repo';
import { UserUpdateInput, UserSettingInput } from './user.input';
import { UserIDArgs } from './user.args';

@Resolver(User)
class UserResolver {
  private readonly userRepo = getCustomRepository(UserRepo);

  private readonly orgRepo = getCustomRepository(OrganizationRepo);

  private readonly userOrgRepo = getRepository(UserOrganization);

  private readonly userSettingRepo = getRepository(UserSetting);

  @Authorized('user', 'owner', 'admin')
  @CanView('user')
  @Query(() => User, { nullable: true })
  async user(
    @Args() { userId }: UserIDArgs,
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

  @Authorized('user')
  @CanView('user')
  @Query(() => UserSetting, { nullable: true })
  async settings(
    @Root() user: User,
      @Ctx() { user: { id, organization } },
  ): Promise<UserSetting> {
    return this.userSettingRepo.findOne({
      where: {
        organizationId: organization.id,
        userId: id,
      }
    });
  }

  @Authorized('user', 'admin', 'owner')
  @Mutation(() => String)
  async updateSettings(
    @Arg('input') { hideInviteWidget }: UserSettingInput,
      @Ctx() { user: { id, organization } }: ContextType,
  ): Promise<string> {
    await this.userRepo.upsertSettings(
      id,
      organization.id,
      hideInviteWidget
    );
    return "user setting updated";
  }

  @Authorized('user', 'owner', 'admin')
  @CanEdit('user')
  @Mutation(() => String)
  async updateUser(
    @Arg('input') { name, position, avatar }: UserUpdateInput,
      @Args() { userId }: UserIDArgs,
      @Ctx() { user: { organization } }: ContextType,
  ): Promise<string> {
    const promises = [];
    const user = this.userRepo.create({ id: userId });

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

    if (avatar) {
      user.avatar = avatar;
    }

    if (Object.keys(user).length) {
      promises.push(
        this.userRepo.save(user),
      );
    }

    if (promises.length) {
      await Promise.all(promises);
    }

    return 'user updated';
  }
}

export default UserResolver;

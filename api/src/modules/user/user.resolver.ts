
import {
  Resolver,
  Query,
  Authorized,
  Arg,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import { IsUUID } from 'class-validator';

import { CanView } from '../../middleware/permissions';
import { User } from '../../entity';
import { UserRepo } from '../../repo';

@Resolver(User)
class UserResolver {
  private readonly userRepo = getCustomRepository(UserRepo);

  @Authorized('user', 'owner', 'admin')
  @CanView('user')
  @Query(() => User, { nullable: true })
  async user(
    @Arg('userId') @IsUUID() userId: string,
  ): Promise<User> {
    return (await this.userRepo.findOne(userId)).user;
  }
}

export default UserResolver;

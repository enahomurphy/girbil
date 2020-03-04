
import {
  Resolver,
  Query,
  Authorized,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { User } from '../../entity';
import { UserRepo } from '../../repo';

@Resolver(User)
class UserResolver {
  private readonly userRepo = getCustomRepository(UserRepo);


  @Authorized()
  @Query(() => User, { nullable: true })
  async user(): Promise<User> {
    return Promise.resolve(this.userRepo.first());
  }
}

export default UserResolver;


import {
  Resolver,
  Query,
} from 'type-graphql';
import { plainToClass } from 'class-transformer';

import User from '../../entity/user';

@Resolver()
class UserResolver {
  private readonly items: User[] = plainToClass(User, [{
    id: 1,
    email: 'enahomurphy@gmail.com',
    isVerified: 'false',
    avatar: 's',
    name: 's',
  }]);

  @Query(() => User, { nullable: true })
  async user(): Promise<User> {
    return this.items[0];
  }
}

export default UserResolver;

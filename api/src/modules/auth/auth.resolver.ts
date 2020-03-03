import {
  Mutation,
  Arg,
  Resolver,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { UserRepo } from '../../repo';
import { AuthType } from './auth.type';
import { UserInput } from '../user/user.input';
import { LoginInput, SocialInput } from './auth.input';
import { sign } from '../../utils/jwt';
import { isValidPassword } from '../../utils/password';
import google from  '../../services/google';

@Resolver(AuthType)
class AuthResolver {
  private readonly userRepo = getCustomRepository(UserRepo);

  @Mutation(() => AuthType)
  async signup(@Arg('input') { email, password, name }: UserInput): Promise<AuthType> {
    const user = await this.userRepo.findByEmail(email);

    if (user) {
      delete user.password;
      return AuthType.createAuth(sign(user));
    }

    const insertedUser = await this.userRepo.createUser(
      email,
      name || '',
      password,
    );

    delete insertedUser.password;
    return AuthType.createAuth(sign(user));
  }

  @Mutation(() => AuthType)
  async login(@Arg('input') { email, password }: LoginInput): Promise<AuthType> {
    const user = await this.userRepo.findByEmail(email);

    if (!user || !isValidPassword(password, user.password)) {
      throw new Error('Invalid email or password');
    }

    delete user.password;
    return AuthType.createAuth(sign(user));
  }

  @Mutation(() => AuthType)
  async social(@Arg('input') { accessToken, type }: SocialInput): Promise<AuthType> {    
    const googleUser = await google.getGoogleUser(accessToken)
    console.log(googleUser);
    const user = await this.userRepo.findOrCreateGoogleUser(
      googleUser.email,
      googleUser.avatar,
      googleUser.name,
      googleUser.verified
    );

    delete user.password;
    return AuthType.createAuth(sign(user))
  }
}

export default AuthResolver;

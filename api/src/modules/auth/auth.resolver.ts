import {
  Mutation,
  Arg,
  Root,
  Resolver,
  FieldResolver,
  ResolverInterface,
} from 'type-graphql';
import { getCustomRepository, getRepository } from 'typeorm';

import { UserRepo } from '../../repo';
import { AuthType } from './auth.type';
import { UserInput } from '../user/user.input';
import { LoginInput, SocialInput } from './auth.input';
import { sign } from '../../utils/jwt';
import { isValidPassword } from '../../utils/password';
import { getGoogleUser } from '../../services/google';
import { Organization, UserOrganization } from '../../entity';

@Resolver(AuthType)
class AuthResolver implements ResolverInterface<AuthType> {
  private readonly userRepo = getCustomRepository(UserRepo);

  private readonly userOrganizationRepo = getRepository(UserOrganization);

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
  async social(@Arg('input') { accessToken }: SocialInput): Promise<AuthType> {
    const googleUser = await getGoogleUser(accessToken);

    const user = await this.userRepo.findOrCreateGoogleUser(
      googleUser.email,
      googleUser.avatar,
      googleUser.name,
      googleUser.verified,
    );

    delete user.password;

    return AuthType.createAuth(sign(user), user);
  }

  @FieldResolver()
  async organizations(@Root() auth: AuthType): Promise<Organization[]> {
    const userOrganizations = await this.userOrganizationRepo.createQueryBuilder('organization')
      .where('organization.userId = :id', { id: auth.user.id })
      .leftJoinAndSelect('organization.organization', 'organizations')
      .getMany();

    return userOrganizations.map((uo) => uo.organization);
  }
}

export default AuthResolver;

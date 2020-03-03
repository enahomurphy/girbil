import { EntityRepository, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '../entity';
import { hashPassword } from '../utils/password';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  findByEmail(email): Promise<User> {
    return this.findOne({ email });
  }

  async createUser(email: string, name?: string, password?: string): Promise<User> {
    try {
      const user = await this.save(this.create({
        email: email.toLowerCase(),
        password: hashPassword(password),
        name,
      }));

      return user;
    } catch (error) {
      if (error.message.match(/users_email_key/gmi)) {
        throw new Error(`email ${email} already exist`);
      }

      throw new Error(error.message);
    }
  }

  async findOrCreateGoogleUser(
    email: string,
    avatar: string,
    name: string,
    verified: boolean,
  ): Promise<User> {
    const user = await this.findOne({ email });

    if (user) {
      return user;
    }

    return this.save(this.create({
      email: email.toLowerCase(),
      name,
      isVerified: verified,
      avatar,
    }));
  }

  static select(user: User): User {
    const userToUpdate: User = { ...user };
    delete userToUpdate.password;
    return plainToClass(User, user);
  }

  async first(): Promise<User> {
    const user = await this.findOne();

    return UserRepository.select(user);
  }
}

export default UserRepository;

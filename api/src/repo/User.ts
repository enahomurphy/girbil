import { EntityRepository, Repository } from 'typeorm';
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
}

export default UserRepository;

import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity';
import { hashPassword } from '../utils/password';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  findByEmail(email): Promise<User> {
    return this.findOne({ email });
  }

  createUser(email: string, name?: string, password?: string): Promise<User> {
    return this.save(this.create({
      email: email.toLowerCase(),
      password: hashPassword(password),
      name,
    }));
  }
}

export default UserRepository;

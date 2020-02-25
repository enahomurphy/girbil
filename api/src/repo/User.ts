import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  findMyPost(id: string): Promise<User> {
    return this.findOne(id);
  }
}

export default UserRepository;

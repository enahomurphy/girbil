/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().seedMany(10);
  }
}

import Faker from 'faker';
import bcrypt from 'bcryptjs';

import { define } from 'typeorm-seeding';
import { User } from '../../entity';

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const name = `${firstName} ${lastName}`;
  const email = faker.internet.email(firstName, lastName);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = bcrypt.hashSync('test1234', 8);
  user.isVerified = faker.random.arrayElement([true, false]);
  user.avatar = faker.image.avatar();
  return user;
});

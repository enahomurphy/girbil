import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { Team } from '../../entity';

define(Team, (faker: typeof Faker, settings: { userId: string }) => {
  const team = new Team();
  team.name = faker.company.companyName();
  team.about = faker.company.bs();
  team.userId = settings.userId;
  team.avatar = faker.image.avatar();

  return team;
});

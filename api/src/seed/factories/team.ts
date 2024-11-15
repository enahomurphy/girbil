import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { Team } from '../../entity';

define(Team, (faker: typeof Faker, settings: { userId: string; organizationId: string }) => {
  const team = new Team();
  team.name = faker.company.companyName();
  team.about = faker.company.bs();
  team.avatar = faker.image.avatar();
  team.userId = settings.userId;
  team.organizationId = settings.organizationId;

  return team;
});

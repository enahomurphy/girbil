import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { Workspace } from '../../entity';

define(Workspace, (faker: typeof Faker, settings: { userId: string }) => {
  const workspace = new Workspace();
  workspace.name = faker.company.companyName();
  workspace.about = faker.company.bs();
  workspace.userId = settings.userId;
  workspace.avatar = faker.image.avatar();

  return workspace;
});

import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { Channel } from '../../entity';

define(Channel, (faker: typeof Faker, settings: {
  userId: string; workspaceId: string;
}) => {
  const channel = new Channel();
  channel.name = faker.company.companyName();
  channel.about = faker.company.bs();
  channel.userId = settings.userId;
  channel.workspaceId = settings.workspaceId;
  channel.avatar = faker.image.avatar();
  channel.lastUpdateById = settings.userId;

  return channel;
});

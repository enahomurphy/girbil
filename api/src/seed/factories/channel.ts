import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { Channel } from '../../entity';

define(Channel, (faker: typeof Faker, settings: {
  userId: string; ownerId: string; organizationId: string;
}) => {
  const channel = new Channel();
  channel.name = faker.company.companyName();
  channel.about = faker.company.bs();
  channel.userId = settings.userId;
  channel.ownerId = settings.ownerId;
  channel.avatar = faker.image.avatar();
  channel.organizationId = settings.organizationId;
  channel.lastUpdateById = settings.userId;

  return channel;
});

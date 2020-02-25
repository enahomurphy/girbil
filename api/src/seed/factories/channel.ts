import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { Channel, ChannelType } from '../../entity';

define(Channel, (faker: typeof Faker, settings: {
  type: ChannelType; ownerId: string; userId: string;
}) => {
  const channel = new Channel();
  channel.name = faker.company.companyName();
  channel.about = faker.company.bs();
  channel.type = settings.type;
  channel.ownerId = settings.ownerId;
  channel.avatar = faker.image.avatar();
  channel.lastUpdateBy = settings.userId;
  channel.userId = settings.userId;

  return channel;
});

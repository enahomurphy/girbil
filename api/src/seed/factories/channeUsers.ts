
import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { ChannelUsers } from '../../entity';

define(ChannelUsers, (faker: typeof Faker, settings: {
  userId: string; channelId: string;
}) => {
  const channelUsers = new ChannelUsers();
  channelUsers.userId = settings.userId;
  channelUsers.channelId = settings.channelId;

  return channelUsers;
});

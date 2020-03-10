import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { Message } from '../../entity';

define(Message, (faker: typeof Faker, settings: {
  conversationId: string; userId: string;
}) => {
  const message = new Message();
  message.senderId = settings.userId;
  message.conversationId = settings.conversationId;
  message.video = faker.random.arrayElement([
    'https://vod-progressive.akamaized.net/exp=1582638944~acl=%2A%2F1436705974.mp4%2A~hmac=c55c55499765d70671e6e89987d7f181df378e63e31bf3238793e90cf237dd13/vimeo-prod-skyfire-std-us/01/708/14/353541809/1436705974.mp4',
  ]);
  message.thumbnail = faker.image.fashion(125, 136);
  return message;
});

import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { Message } from '../../entity';

define(Message, (faker: typeof Faker, settings: {
  conversationId: string; userId: string; parentId?: string;
}) => {
  const message = new Message();
  message.senderId = settings.userId;
  message.conversationId = settings.conversationId;
  message.parentId = settings.parentId;
  message.video = faker.random.arrayElement([
    'https://girbil.s3-us-west-2.amazonaws.com/Pexels+Videos+1353979.mp4',
    'https://girbil.s3-us-west-2.amazonaws.com/Pexels+Videos+2795742.mp4',
    'https://girbil.s3-us-west-2.amazonaws.com/video+(1).mp4',
    'https://girbil.s3-us-west-2.amazonaws.com/video.mp4',
  ]);
  message.thumbnail = faker.image.fashion(125, 136);
  return message;
});

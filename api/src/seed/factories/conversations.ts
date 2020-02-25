import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { Conversation, ConversationType } from '../../entity';

define(Conversation, (faker: typeof Faker, settings: {
  type: ConversationType; sender: string; receiver: string;
}) => {
  const conversation = new Conversation();
  conversation.type = settings.type;
  conversation.sender = settings.sender;
  conversation.receiver = settings.receiver;
  conversation.approved = settings.type === ConversationType.USER
    ? faker.random.arrayElement([true, false]) : true;
  return conversation;
});

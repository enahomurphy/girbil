import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { Conversation } from '../../entity';

define(Conversation, (faker: typeof Faker, settings: {
  sender: string; receiver: string; teamId: string;
}) => {
  const conversation = new Conversation();
  conversation.senderId = settings.sender;
  conversation.receiverId = settings.receiver;
  conversation.teamId = settings.teamId;
  return conversation;
});

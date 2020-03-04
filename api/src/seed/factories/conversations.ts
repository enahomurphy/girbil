import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { Conversation, ConversationType } from '../../entity';

define(Conversation, (faker: typeof Faker, settings: {
  type: ConversationType; sender: string; receiver: string; teamId: string;
}) => {
  const conversation = new Conversation();
  conversation.type = settings.type;
  conversation.senderId = settings.sender;
  conversation.receiverId = settings.receiver;
  conversation.teamId = settings.teamId;
  return conversation;
});

import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { Conversation, ConversationType } from '../../entity';

define(Conversation, (faker: typeof Faker, settings: {
  creatorId: string; receiverId: string; organizationId: string; type: ConversationType;
}) => {
  const conversation = new Conversation();
  conversation.creatorId = settings.creatorId;
  conversation.receiverId = settings.receiverId;
  conversation.organizationId = settings.organizationId;
  conversation.receiverType = settings.type;
  return conversation;
});

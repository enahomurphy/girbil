import {
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES,
  CONVERSATION,
} from './query';
import { get } from '../../../lib';

export const message = (_, { conversationId, messageId, threadId }, { cache }) => {
  const variables = { conversationId };

  if (threadId) {
    variables.messageId = threadId;
  }

  const { messages } = cache.readQuery({
    query: CONVERSATION_MESSAGES,
    variables,
  });

  return messages.find((item) => item.id === messageId);
};

export const conversation = (_, { conversationId }, { cache }) => {
  const { conversations } = cache.readQuery({
    query: USER_CONVERSATIONS,
    variables: { conversationId },
  });

  return conversations.find(({ id }) => id === conversationId);
};

export const conversationMeta = (_, { conversationId }, { cache }) => {
  const { conversation: conv } = cache.readQuery({
    query: CONVERSATION,
    variables: { conversationId },
  });
  const {
    id,
    receiverType,
    receiver,
    channel,
  } = conv;

  const data = {
    id,
    name: get(receiver || channel, 'name'),
    typeId: get(receiver || channel, 'id'),
    isPrivate: get(receiver || channel, 'isPrivate', false),
    avatar: get(receiver || channel, 'avatar', false),
    isChannel: receiverType === 'channel',
  };

  return data;
};

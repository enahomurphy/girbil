import {
  GET_MESSAGES,
  CONVERSATION,
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES
} from './query';
import { get } from '../../../lib';

export const message = (_, { conversationId, messageId, threadId }, { cache }) => {
  const variables = { conversationId };
  
  if (threadId) {
    variables.messageId = threadId;
  }

  const { messages } = cache.readQuery({
    query: CONVERSATION_MESSAGES,
    variables
  });

  return messages.find((item) => item.id === messageId)
}

export const conversation = (_, { conversationId }, { cache }) => {
  const { conversations } = cache.readQuery({
    query: USER_CONVERSATIONS,
    variables: { conversationId }
  });
  
  const conversation = conversations.find(({ id }) => id === conversationId);

  return conversation;
}

export const conversationMeta = (_, { conversationId }, { cache }) => {
  const { conversations } = cache.readQuery({
    query: USER_CONVERSATIONS,
    variables: { conversationId }
  });

  const {
    id,
    receiverType,
    receiver,
    channel,
  } = conversations.find(({ id }) => id === conversationId);

  const data = {
    id,
    name: get(receiver || channel, 'name'),
    typeId: get(receiver || channel, 'id'),
    isPrivate: get(receiver || channel, 'isPrivate', false),
    avatar: get(receiver || channel, 'avatar', false),
    isChannel: receiverType === 'channel'
  };

  return data;
}
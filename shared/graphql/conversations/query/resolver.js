import {
  USER_CONVERSATIONS,
  CONVERSATION,
} from './query';
import { get } from '../../../lib';
import { MESSAGE_FRAGMENT } from './fragments';

export const message = (_, { messageId }, { cache }) => {
  const foundMessage = cache.readFragment({
    fragment: MESSAGE_FRAGMENT,
    id: cache.identify({ __typename: 'Message', id: messageId }),
  });

  return foundMessage;
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

export const unreadCount = (_, args, { cache }) => {
  const { conversations } = cache.readQuery({
    query: USER_CONVERSATIONS,
  });

  return conversations.reduce((acc, value) => acc + value.unread, 0);
};

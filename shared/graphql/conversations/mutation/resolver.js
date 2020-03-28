import { v4 as uuidv4 } from 'uuid';

import { CONVERSATION_MESSAGES } from '../query';
import { UPDATE_MESSAGE } from './mutation';
import { storage } from '../../../lib';


export const readMessage = (_, { id, conversationId }, { cache }) => {
  const data = cache.readQuery({
    query: CONVERSATION_MESSAGES,
    variables: { conversationId },
  });

  const message = data.messages.find((m) => id === m.id);

  cache.writeQuery({
    UPDATE_MESSAGE,
    data: { message },
  });
};

export const addMessage = (_, { conversationId, messageId }, { cache }) => {
  const variables = { conversationId };

  if (messageId) {
    variables.messageId = messageId;
  }

  const data = cache.readQuery({
    query: CONVERSATION_MESSAGES,
    variables,
  });

  const { id, avatar, name } = storage.payload;
  const message = {
    id: uuidv4(),
    video: '',
    thumbnail: '',
    conversationId,
    replyCount: 0,
    parentId: messageId || null,
    state: 'recording',
    hasRead: true,
    reactions: null,
    createdAt: new Date(),
    __typename: 'Message',
    sender: {
      id,
      name,
      avatar,
      createdAt: new Date().getTime(),
      __typename: 'User',
    },
  };

  const messages = [...data.messages, message];

  cache.writeQuery({
    query: CONVERSATION_MESSAGES,
    variables,
    data: { messages },
  });

  return message;
};

export const updateState = (_, args, { cache }) => {
  cache.modify(
    'ROOT_QUERY',
    {
      messages(items, { readField }) {
        items.forEach((item) => {
          const isNotDone = readField('state', item) !== 'done';
          if (isNotDone) {
            cache.modify(
              cache.identify({ __typename: 'Message', id: readField('id', item) }),
              {
                state() {
                  return 'done';
                },
              },
            );
          }
        });

        return [...items];
      },
    },
  );

  cache.modify(
    cache.identify({ __typename: 'Message', id: args.messageId }),
    {
      state(value) {
        if (args.state === 'toggle') {
          return value === 'playing' ? 'pause' : 'playing';
        }

        return args.state;
      },
    },
  );
};

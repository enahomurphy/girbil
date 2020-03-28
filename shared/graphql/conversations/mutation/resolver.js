import { v4 as uuidv4 } from 'uuid';

import { MESSAGES, CONVERSATION_MESSAGES } from '../query';
import { UPDATE_MESSAGE } from './mutation';
import { storage } from '../../../lib';


export const updateMessage = (_, args, { cache }) => {
  const data = cache.readQuery({
    query: MESSAGES,
  });

  const message = data.messages.find((m) => args.id === m.id);

  if (message) {
    const updatedMessage = {
      ...message,
      url: args.input.url,
      state: 'done',
    };
    cache.writeQuery({
      UPDATE_MESSAGE,
      data: { message: updatedMessage },
    });
  }
};

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

  cache.modify(
    'ROOT_QUERY',
    {
      messages(items) {
        return [...items, message];
      },
    },
  );

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

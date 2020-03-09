import { v4 as uuidv4 } from 'uuid';

import { storage } from '@shared/lib'
import { MESSAGES, CONVERSATION_MESSAGES } from './query';
import { UPDATE_MESSAGE, ADD_MESSAGE } from './conversations.mutation';

export default {
  Query: {
    messages: (_, variables, { cache }) => {
      const data = cache.readQuery({
        query: MESSAGES,
      });

      return data.messages;
    },

    message: (_, { args: { id } }, { cache }) => {
      const data = cache.readQuery({
        query: MESSAGES,
      });
      
      const message = data.messages.find((m) => m.id === id);

      return message;
    },
  },
  Mutation: {
    updateMessage: (_, args, { cache }) => {
      const data = cache.readQuery({
        query: MESSAGES,
      });

      const message = data.messages.find((m) => args.id === m.id);

      if (message) {
        const updatedMessage = {
          ...message,
          url: args.input.url,
          state: 'done'
        }
        cache.writeData({
          UPDATE_MESSAGE,
          data: { message: updatedMessage },
        });
      }
   
    },
    readMessage: (_, { id, conversationId }, { cache }) => {
      const data = cache.readQuery({
        query: CONVERSATION_MESSAGES,
        variables: { conversationId }
      });
      
      const message = data.messages.find((m) => id === m.id);

      cache.writeData({
        UPDATE_MESSAGE,
        data: { message: message },
      });
    },
    addMessage: (_, { conversationId }, { cache }) => {
      const data = cache.readQuery({
        query: CONVERSATION_MESSAGES,
        variables: { conversationId }
      });

      const { id, avatar, name } = storage.payload;
      const message = {
        id: uuidv4(),
        video: '',
        thumbnail: '',
        conversationId,
        state: 'recording',
        __typename: 'Message',
        sender: {
          id,
          name,
          avatar,
          createdAt: new Date(),
          __typename: 'User'
        },
      }

      const messages = [...data.messages, message];
      const key = `messages({"conversationId":"${conversationId}"})`;

      cache.writeData({
        CONVERSATION_MESSAGES,
        variables: { conversationId },
        data: { [key]: messages },
      });

      return message
    },
  },
};

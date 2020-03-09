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
    addMessage: (_, args, { cache }) => {
      const data = cache.readQuery({
        query: MESSAGES,
      });

      const id = data.messages.length + 1;
      const message = {
        id: id.toString(),
        video: `/static/vid${Math.ceil(Math.random() * 3)}.mp4`,
        thumbnail: `https://i.picsum.photos/id/${id + 1}/125/136.jpg`,
        __typename: `${1}_${id}`,
        state: 'recording',
        sender: {
          name: 'girbil bob',
          createdAt: 'on Thursday 5:25 PM',
          __typename: `${1}_${id}`,
        },
      }

      const messages = [...data.messages, message];

      cache.writeData({
        ADD_MESSAGE,
        data: { messages },
      });

      return message
    },
  },
};

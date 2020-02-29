import { MESSAGES } from './conversations.query';
import { UPDATE_MESSAGE } from './conversations.mutation';

export default {
  Query: {
    messages: (_, variables, { cache }) => {
      const data = cache.readQuery({
        query: MESSAGES,
      });

      return data.messages;
    },
  },
  Mutation: {
    updateMessage: (_, { id }, { cache }) => {
      const data = cache.readQuery({
        query: MESSAGES,
      });

      const message = data.messages.find((m) => id === m.id);

      cache.writeData({
        UPDATE_MESSAGE,
        data: { message },
      });
    },
  },
};

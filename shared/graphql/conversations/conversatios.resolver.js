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
    addMessage: (_, _id, { cache }) => {
      const data = cache.readQuery({
        query: MESSAGES,
      });

      const id = data.messages.length + 1;

      const messages = [...data.messages, {
        id: id.toString(),
        url: `/static/vid${Math.ceil(Math.random() * 3)}.mp4`,
        thumbnail: `https://i.picsum.photos/id/${id + 1}/125/136.jpg`,
        __typename: `${1}_${id}`,
        state: 'recording',
        sender: {
          name: 'girbil bob',
          createdAt: 'on Thursday 5:25 PM',
          __typename: `${1}_${id}`,
        },
      }];

      cache.writeData({
        UPDATE_MESSAGE,
        data: { messages },
      });
    },
  },
};

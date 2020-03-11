import { v4 as uuidv4 } from 'uuid';

import { MESSAGES, CONVERSATION_MESSAGES } from '../query'
import { UPDATE_MESSAGE } from './mutation'
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
      state: 'done'
    }
    cache.writeQuery({
      UPDATE_MESSAGE,
      data: { message: updatedMessage },
    });
  }
}

export const readMessage = (_, { id, conversationId }, { cache }) => {
  const data = cache.readQuery({
    query: CONVERSATION_MESSAGES,
    variables: { conversationId }
  });
  
  const message = data.messages.find((m) => id === m.id);

  cache.writeQuery({
    UPDATE_MESSAGE,
    data: { message: message },
  });
}

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
    parentId: messageId || null,
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

  cache.writeQuery({
    query: CONVERSATION_MESSAGES,
    variables,
    data: { messages },
  });

  return message
}
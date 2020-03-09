import { useMutation, useLazyQuery } from '@apollo/react-hooks';

import { SAVE_MESSAGE } from './mutation'
import { CONVERSATION_MESSAGES } from '../query'

export const useSaveMessage = () => {
  const [save, { data, loading, error }] = useMutation(SAVE_MESSAGE);

  const handler = async ({ id, video, thumbnail, conversationId }) => {
    return save({
      variables: {
        id,
        video,
        thumbnail,
        conversationId,
      },
      update: (store, { data: { addMessage } }) => {
        const data = cache.readQuery({
          query: CONVERSATION_MESSAGES,
          variables: { conversationId }
        });

        const messages = data.messages.filter((m) => m.id !== id);
        const message = data.messages.find((m) => m.id === id);

        const updatedMessage = { ...message, ...addMessage };

        messages.push(updatedMessage);
        
        const key = `messages({"conversationId":"${conversationId}"})`;
        store.writeQuery({
          query: query.ORGANIZATIONS,
          data: { [key]: messages },
        });
      },
    })
  }

  return [handler, { data, loading, error }]
}
import { useMutation, useLazyQuery } from '@apollo/client';

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
      }
    })
  }

  return [handler, { data, loading, error }]
}
import { useMutation, useLazyQuery } from '@apollo/client';

import { SAVE_MESSAGE } from './mutation'

export const useSaveMessage = () => {
  const [save, { data, loading, error }] = useMutation(SAVE_MESSAGE);

  const handler = async ({ id, video, thumbnail, conversationId, parentId }) => {
    return save({
      variables: {
        id,
        video,
        thumbnail,
        conversationId,
        parentId,
      }
    })
  }

  return [handler, { data, loading, error }]
}
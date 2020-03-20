import { useMutation } from '@apollo/client';

import { SAVE_MESSAGE, MARK_MESSAGE_AS_READ } from './mutation';

export const useSaveMessage = () => {
  const [save, { data, loading, error }] = useMutation(SAVE_MESSAGE);

  const handler = async ({
    id, video, thumbnail, conversationId, parentId,
  }) => save({
    variables: {
      id,
      video,
      thumbnail,
      conversationId,
      parentId,
    },
  });

  return [handler, { data, loading, error }];
};

export const useMarkAsRead = () => {
  const [save, { data, loading, error }] = useMutation(MARK_MESSAGE_AS_READ);

  const handler = async ({ messageId, conversationId }) => markAsRead({
    variables: { messageId, conversationId },
    update: () => {
      console.log('I was called');
      // get conversation
    },
  });

  return [handler, { data, loading, error }];
};

export default {};

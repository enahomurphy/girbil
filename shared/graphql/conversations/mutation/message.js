import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import {
  SAVE_MESSAGE,
  DELETE_MESSAGE,
  MARK_MESSAGE_AS_UNREAD,
  MARK_MESSAGE_AS_READ,
  UPDATE_MESSAGE_STATE,
} from './mutation';

export const useSaveMessage = () => {
  const [save, { data, loading, error }] = useMutation(SAVE_MESSAGE);

  const handler = ({
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

export const useDeleteMessage = () => {
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  const handler = (messageId) => deleteMessage({ variables: { messageId } });

  return [handler];
};

export const useMarkMessage = (state = 'read') => {
  const [markMessage] = useMutation(
    state === 'read' ? MARK_MESSAGE_AS_READ : MARK_MESSAGE_AS_UNREAD,
  );

  const handler = useCallback(
    (variables) => markMessage({
      variables,
      update: (store) => {
        store.modify(
          store.identify({ __typename: 'Message', id: variables.messageId }),
          {
            hasRead(value) {
              return !value;
            },
          },
        );
      },
      refetchQueries: ['conversations'],
    }),
    [markMessage],
  );

  return [handler];
};

export const useMessageState = () => {
  const [updateState] = useMutation(UPDATE_MESSAGE_STATE);

  const handler = useCallback(
    (variables, callback = () => {}) => updateState({
      variables,
      update: (...args) => {
        callback(args);
      },
    }),

    [updateState],
  );

  return [handler];
};

export const markMessage = (client, variables, state) => {
  const mutation = state === 'read' ? MARK_MESSAGE_AS_READ : MARK_MESSAGE_AS_UNREAD;

  return client.mutate(
    {
      mutation,
      variables,
      fetchPolicy: 'no-cache',
      update: (store) => {
        store.modify(
          store.identify({ __typename: 'Message', id: variables.messageId }),
          {
            hasRead(value) {
              return !value;
            },
          },
        );
      },
      refetchQueries: ['conversations'],
    },
  );
};

export default {};

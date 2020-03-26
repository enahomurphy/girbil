import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import {
  SAVE_MESSAGE,
  DELETE_MESSAGE,
  MARK_MESSAGE_AS_UNREAD,
  MARK_MESSAGE_AS_READ,
  UPDATE_MESSAGE_STATE,
  REACT_TO_MESSAGE,
} from './mutation';
import { GET_MESSAGE } from '../query';

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

export const useAddReaction = () => {
  const [reactToMessage] = useMutation(REACT_TO_MESSAGE);
  const handler = useCallback(
    (variables) => reactToMessage({
      variables,
      update: (store) => {
        const storeMessage = store.readQuery({
          query: GET_MESSAGE,
          variables,
        });

        store.writeQuery({
          query: GET_MESSAGE,
          variables,
          data: { message: { ...storeMessage.message } },
        });
      },
      refetchQueries: ['userMessages'],
    }),
    [reactToMessage],
  );

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

export const useDeleteMessage = () => {
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  const handler = useCallback(
    (variables, cb) => deleteMessage({
      variables: { messageId: variables.messageId },
      update: (store) => {
        store.modify('ROOT_QUERY', {
          messages(items, { readField }) {
            return items.filter((item) => readField('id', item) !== variables.messageId);
          },
        });
        store.gc();
        cb();
      },
      refetchQueries: ['conversations'],
    }),
    [deleteMessage],
  );

  return [handler];
};

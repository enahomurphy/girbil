import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import {
  SAVE_MESSAGE,
  DELETE_MESSAGE,
  MARK_MESSAGE_AS_UNREAD,
  MARK_MESSAGE_AS_READ,
  UPDATE_MESSAGE_STATE,
  REACT_TO_MESSAGE,
} from '../mutation';
import { GET_MESSAGE, GET_MESSAGES } from '../../query';

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
      update: (store, { data: { markAsUnRead, markAsRead } }) => {
        if (state === 'read') {
          const { parentId, id, conversationId } = (markAsUnRead || markAsRead);
          const queryVariables = { conversationId };
          if (parentId) {
            queryVariables.messageId = parentId;
          }

          const { messages } = store.readQuery({
            query: GET_MESSAGES,
            variables: queryVariables,
          });

          const messageIndex = messages.findIndex(({ id: mId }) => id === mId);

          const newMessages = messages.map((m, index) => {
            if (index <= messageIndex) {
              return { ...m, hasRead: true };
            }
            return m;
          });

          store.writeQuery({
            query: GET_MESSAGES,
            variables: queryVariables,
            data: { messages: newMessages },
          });
        } else {
          store.modify(
            store.identify({ __typename: 'Message', id: variables.messageId }),
            {
              hasRead(value) {
                return !value;
              },
            },
          );
        }
      },
      refetchQueries: ['conversations'],
    }),
    [markMessage, state],
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

export const useDeleteMessage = () => {
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  const handler = useCallback(
    (variables, cb = () => {}) => deleteMessage({
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

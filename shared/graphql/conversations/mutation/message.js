import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import {
  SAVE_MESSAGE,
  DELETE_MESSAGE,
  MARK_MESSAGE_AS_UNREAD,
  MARK_MESSAGE_AS_READ,
  UPDATE_MESSAGE_STATE,
} from './mutation';

import { GET_MESSAGE, USER_CONVERSATIONS, CONVERSATION_MESSAGES } from '../query';

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

export const useMarkAsRead = () => {
  const [markAsRead] = useMutation(MARK_MESSAGE_AS_READ);

  const handler = useCallback(
    (variables) => markAsRead({
      variables,
      update: (store) => {
        const storeMessage = store.readQuery({
          query: GET_MESSAGE,
          variables,
        });

        store.writeQuery({
          query: GET_MESSAGE,
          variables,
          data: { message: { ...storeMessage.message, hasRead: true } },
        });
      },
      refetchQueries: ['conversations'],
    }),
    [markAsRead],
  );

  return [handler];
};

export const useMarkMessage = (state = 'read') => {
  const [markAsUnread] = useMutation(
    state === 'read' ? MARK_MESSAGE_AS_READ : MARK_MESSAGE_AS_UNREAD,
  );

  const handler = useCallback(
    (variables) => markAsUnread({
      variables,
      update: (store) => {
        const vars = {
          conversationId: variables.conversationId,
        };

        if (vars.threadId) {
          vars.messageId = vars.threadId;
        }


        const storeMessage = store.readQuery({
          query: CONVERSATION_MESSAGES,
          variables: vars,
        });

        const messages = storeMessage.messages.map((message) => {
          if (message.id === variables.messageId || message.id === variables.threadId) {
            return { ...message, hasRead: state === 'read' };
          }

          return message;
        });

        store.writeQuery({
          query: USER_CONVERSATIONS,
          variables: vars,
          data: { messages },
        });
      },
      refetchQueries: ['conversations'],
    }),
    [markAsUnread, state],
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

export default {};

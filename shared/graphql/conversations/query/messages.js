import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';

import { CONVERSATION_MESSAGES } from './query';
import { get } from '../../../lib';

export const useMessages = (conversationId, threadId) => {
  const [getLazyMessages, { loading, data }] = useLazyQuery(CONVERSATION_MESSAGES, {
    fetchPolicy: 'network-only',
  });

  const loadMessages = useCallback(async () => getLazyMessages({
    variables: {
      conversationId,
      messageId: threadId,
    },
  }), [conversationId, getLazyMessages, threadId]);

  return [
    loadMessages,
    {
      messages: get(data, 'messages', []),
      loading,
    },
  ];
};

export const useMessageState = (conversationId, threadId) => {
  const [getLazyMessages, { loading, data }] = useLazyQuery(CONVERSATION_MESSAGES);

  const loadMessages = useCallback(async () => getLazyMessages({
    variables: {
      conversationId,
      messageId: threadId,
    },
  }), [conversationId, getLazyMessages, threadId]);

  return [
    loadMessages,
    {
      messages: get(data, 'messages', []),
      loading,
    },
  ];
};

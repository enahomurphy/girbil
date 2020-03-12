import { useEffect, useCallback } from 'react';
import { useLazyQuery, useApolloClient, useQuery } from '@apollo/client';

import { CONVERSATION_MESSAGES } from './query';
import { get } from '../../../lib';

export const useMessages = (conversationId, threadId) => {
  const client = useApolloClient();
  const [getLazyMessages, { loading, data }] = useLazyQuery(CONVERSATION_MESSAGES);

  const loadMessages = useCallback(async () => {
    return getLazyMessages({
      variables: {
        conversationId,
        messageId: threadId,
      },
    });
  }, [conversationId, threadId]);

  return [
    loadMessages,
    { 
      messages: get(data, 'messages', []),
      loading,
    }
  ];
}

export const useMessageState = (conversationId, threadId) => {
  const client = useApolloClient();
  const [getLazyMessages, { loading, data }] = useLazyQuery(CONVERSATION_MESSAGES);

  const loadMessages = useCallback(async () => {
    return getLazyMessages({
      variables: {
        conversationId,
        messageId: threadId,
      },
    });
  }, [conversationId, threadId]);

  return [
    loadMessages,
    { 
      messages: get(data, 'messages', []),
      loading,
    }
  ];
}

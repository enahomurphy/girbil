import { useEffect, useCallback } from 'react';
import { useLazyQuery, useApolloClient, useQuery } from '@apollo/client';

import query, { CONVERSATION_MESSAGES, MESSAGES, GET_MESSAGES } from './query';
import { get, mergeUniqueArrays } from '../../../lib';

const updateCache = (data, client) => {
  const { messages } = client.readQuery({ query: MESSAGES });
  const mergedMessages = mergeUniqueArrays(messages, data.messages)

  client.writeQuery({
    query: MESSAGES,
    data: { messages: mergedMessages },
  });
}

export const useCachedMessages = () => {
  const [getMessages, { data,  error }] = useLazyQuery(GET_MESSAGES);
  console.log(data, error)

  return [getMessages, { messages: [] }];
}

export const useMessages = (conversationId, threadId) => {
  const client = useApolloClient();
  const { data, refetch } = useQuery(GET_MESSAGES, {
    variables: { conversationId, messageId: threadId },
  });

  const [getLazyMessages, { loading }] = useLazyQuery(
    CONVERSATION_MESSAGES,
    {
      onCompleted: (serverData) => {
        updateCache(serverData, client);
        refetch();
      }
    }
  );

  const loadMessages = useCallback(async () => {
    return getLazyMessages({
      variables: {
        conversationId,
        messageId: threadId,
      },
    });
  }, [conversationId, threadId]);

  console.log(data);

  return [
    loadMessages,
    { 
      messages: get(data, 'getMessages', []),
      loading,
    }
  ];
}


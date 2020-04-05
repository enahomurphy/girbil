import { useQuery, useApolloClient } from '@apollo/client';

import { USER_CONVERSATIONS } from './query';
import { get } from '../../../lib';
import { CONVERSATION_FRAGMENT } from './fragments';

export const useGetUserConversations = () => {
  const { data, loading } = useQuery(USER_CONVERSATIONS);

  return { conversations: get(data, 'conversations', []), loading };
};

export const useConversation = () => {
  const { data, loading } = useQuery(USER_CONVERSATIONS);

  return { conversations: get(data, 'conversations', []), loading };
};

export const useFindOrPullConversation = () => {
  const client = useApolloClient();

  return (id) => {
    const conversationId = client.cache.identify({
      __typename: 'Conversation',
      id,
    });

    const conversation = client.cache.readFragment({
      id: conversationId,
      fragment: CONVERSATION_FRAGMENT,
    });

    if (!conversation) {
      client.query({
        query: USER_CONVERSATIONS,
        fetchPolicy: 'network-only',
      });
    }

    return conversation;
  };
};

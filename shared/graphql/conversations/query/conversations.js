import { useQuery, useApolloClient } from '@apollo/client';

import { USER_CONVERSATIONS, CONVERSATION } from './query';
import { get } from '../../../lib';

export const useGetUserConversations = () => {
  const { data, loading } = useQuery(USER_CONVERSATIONS);

  return { conversations: get(data, 'conversations', []), loading };
};

export const useConversations = () => {
  const { data, loading } = useQuery(USER_CONVERSATIONS);

  return { conversations: get(data, 'conversations', []), loading };
};

export const useConversation = (conversationId) => {
  const client = useApolloClient();
  const { conversations } = client.cache.readQuery({
    query: USER_CONVERSATIONS,
  });

  return conversations.find(({ id }) => conversationId === id);
};

export const useFindOrPullConversation = () => {
  const client = useApolloClient();

  return async (conversationId) => {
    const { conversations } = client.cache.readQuery({
      query: USER_CONVERSATIONS,
    });

    const conversation = conversations.find(({ id }) => conversationId === id);

    if (conversation) {
      return conversation;
    }

    const { data } = await client.query({
      query: CONVERSATION,
      variables: { conversationId },
      fetchPolicy: 'network-only',
    });

    const serverConversation = get(data, 'conversation', null);

    if (serverConversation) {
      client.writeQuery({
        query: USER_CONVERSATIONS,
        data: { conversations: [...conversations, serverConversation] },
      });
    }

    return serverConversation;
  };
};

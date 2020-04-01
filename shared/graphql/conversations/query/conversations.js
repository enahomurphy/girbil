import { useQuery, useApolloClient, gql } from '@apollo/client';

import { USER_CONVERSATIONS, CONVERSATION } from './query';
import { get } from '../../../lib';

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
      fragment: gql`
        fragment ConversationParts on Conversation {
          id
          userId
        }
      `,
    });

    if (!conversation) {
      client.query({
        query: CONVERSATION,
        fetchPolicy: 'network-only',
        variables: { conversationId: id },

      });
    }

    return conversation;
  };
};

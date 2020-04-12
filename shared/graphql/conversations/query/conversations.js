import { useQuery, useApolloClient } from '@apollo/client';

import { USER_CONVERSATIONS, CONVERSATION } from './query';
import { get } from '../../../lib';

export const useGetUserConversations = (callback = () => {}) => {
  const { data, loading } = useQuery(USER_CONVERSATIONS, {
    onCompleted: callback,
  });

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

  return async (conversationId, newMessage) => {
    const { conversations } = client.cache.readQuery({
      query: USER_CONVERSATIONS,
    });

    const conversation = conversations.find(({ id }) => conversationId === id);

    if (conversation) {

      if (newMessage) {
        let update = conversations.filter(({ id }) => conversationId !== id);

        client.writeQuery({
          query: USER_CONVERSATIONS,
          data: { conversations: [conversation, ...update] },
        });
      }

      return conversation;
    }

    const { data } = await client.query({
      query: CONVERSATION,
      variables: { conversationId },
      fetchPolicy: 'network-only',
    });

    const serverConversation = get(data, 'conversation', null);
    let update  = [];

    if (newMessage) {
      update = [serverConversation, ...conversations];
    }

    if (serverConversation) {
      client.writeQuery({
        query: USER_CONVERSATIONS,
        data: { conversations: update },
      });
    }

    return serverConversation;
  };
};

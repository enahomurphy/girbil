import { useQuery } from '@apollo/client';

import { USER_CONVERSATIONS } from './query';
import { get } from '../../../lib';

export const useGetUserConversations = () => {
  const { data, loading } = useQuery(USER_CONVERSATIONS);

  return { conversations: get(data, 'conversations', []), loading };
};

export const useConversation = () => {
  const { data, loading } = useQuery(USER_CONVERSATIONS);

  return { conversations: get(data, 'conversations', []), loading };
};

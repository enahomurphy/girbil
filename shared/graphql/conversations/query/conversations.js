import { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';

import { USER_CONVERSATIONS, MESSAGES, GET_USERS_WITHOUT_CONVERSATION } from './query';
import { get } from '../../../lib';

export const getUserConversations = () => {
  const { data, loading, updateQuery } = useQuery(USER_CONVERSATIONS);

  return { conversations: get(data, 'conversations', []), loading }
}

export const conversation = () => {
  const { data, loading, updateQuery } = useQuery(USER_CONVERSATIONS);

  return { conversations: get(data, 'conversations', []), loading }
}
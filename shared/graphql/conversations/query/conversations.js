import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { USER_CONVERSATIONS, MESSAGES } from './query';
import { get } from '../../../lib';

export const getUserConversations = () => {
  const { data, loading, updateQuery } = useQuery(USER_CONVERSATIONS);

  return { conversations: get(data, 'conversations', []), loading }
}

export const conversation = () => {
  const { data, loading, updateQuery } = useQuery(USER_CONVERSATIONS);

  return { conversations: get(data, 'conversations', []), loading }
}
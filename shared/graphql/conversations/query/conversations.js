import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { USER_CONVERSATIONS, MESSAGES } from './query';
import { get } from '@shared/lib';

export const getUserConversations = () => {
  const { data, loading, updateQuery } = useQuery(USER_CONVERSATIONS);

  return { conversations: get(data, 'conversations', []), loading }
}
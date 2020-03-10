import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import { CONVERSATION_MESSAGES } from './query';
import { get } from '../../../lib';

export const getConversationMessages = () => {
  const [getLazyMessages, { data, loading }] = useLazyQuery(CONVERSATION_MESSAGES);

  const getMessages = (conversationId) => {
    return getLazyMessages({
      variables: {
        conversationId
      },
    });
  }

  return [getMessages, { messages: get(data, 'messages', []), loading }];
}
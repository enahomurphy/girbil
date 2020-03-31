import { useApolloClient } from '@apollo/client';

import { CONVERSATION_MESSAGES } from '../../query';
import { pick } from '../../../../lib';


export const getConversationMessages = (cache, variables) => {
  try {
    const { messages = [] } = cache.readQuery({
      query: CONVERSATION_MESSAGES,
      variables,
    });


    return [...messages];
  } catch (error) {
    return [];
  }
};

export const useMesageReceived = () => {
  const client = useApolloClient();


  return (message) => {
    const variables = pick(message, ['conversationId', 'parentId:messageId']);
    const conversation = client.cache.identify({
      __typename: 'Conversation',
      id: variables.conversationId,
    });

    if (!conversation) {
      return null;
    }

    const messages = getConversationMessages(client, variables);
    messages.push({
      ...message,
      __typename: 'Message',
      hasRead: false,
    });

    client.writeQuery({
      query: CONVERSATION_MESSAGES,
      variables,
      data: { messages },
    });

    if (conversation) {
      client.cache.modify(
        conversation, {
          unread(value = 0) {
            return value + 1;
          },
        },
      );
    }
    return null;
  };
};


export default { useMesageReceived };

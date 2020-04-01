import { useApolloClient } from '@apollo/client';

import { CONVERSATION_MESSAGES, MESSAGE_FRAGMENT } from '../../query';
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

export const useMessageDeleted = () => {
  const client = useApolloClient();

  return ({ id: messageId, conversationId }) => {
    const message = client.readFragment({
      id: client.cache.identify({
        __typename: 'Message',
        id: messageId,
      }),
      fragment: MESSAGE_FRAGMENT,
    });

    if (!message) {
      return null;
    }

    client.cache.modify('ROOT_QUERY', {
      messages(items, { readField }) {
        return items.filter((item) => readField('id', item) !== messageId);
      },
    });

    client.cache.gc();

    client.cache.modify(
      client.cache.identify({ __typename: 'Conversation', id: conversationId }),
      {
        unread(value = 0) {
          return message.hasRead ? value : value - 1;
        },
      },
    );
    return null;
  };
};

export default { useMesageReceived };

import { useContext, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

import { storage } from '@shared/lib';
import { SocketContext } from '../socket';
import { MESSAGE_CREATED } from '../events';

export const useOrgMessageListener = () => {
  const pusher = useContext(SocketContext);
  const client = useApolloClient();
  const userId = storage.payload.id;
  const orgId = storage.payload.organization.id;

  useEffect(() => {
    const channel = pusher.subscribe(orgId);
    channel.bind(MESSAGE_CREATED, ({ data }) => {
      const conversation = client.cache.identify({
        __typename: 'Conversation',
        id: data.conversationId,
      });

      if (conversation && data.sender.id !== userId) {
        client.cache.modify('ROOT_QUERY', {
          messages(items) {
            return [...items, data];
          },
        });

        client.cache.modify(
          conversation, {
            unread(value) {
              return value ? value + 1 : 1;
            },
          },
        );
      }
    });

    return () => {
      pusher.unsubscribe(orgId);
    };
  }, [client.cache, orgId, pusher, userId]);
};


export default {};
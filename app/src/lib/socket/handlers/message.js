import { useContext, useEffect } from 'react';

import { storage, get } from '@shared/lib';
import { query, mutation } from '@shared/graphql/conversations';
import { SocketContext } from '../socket';
import { MESSAGE_CREATED } from '../events';

export const useOrgUserListener = () => {
  const socket = useContext(SocketContext);
  const findOrPullConversation = query.useFindOrPullConversation();
  const addMessage = mutation.useMesageReceived();

  useEffect(() => {
    const userId = get(storage, 'payload.id');
    const orgId = get(storage, 'payload.organization.id');

    const channelId = `${userId}-${orgId}`;
    const subscribed = socket.channels.channels[channelId];

    if (!subscribed) {
      const channel = socket.subscribe(channelId);

      channel.bind(MESSAGE_CREATED, ({ data }) => {
        const conversation = findOrPullConversation(data.conversationId);
        if (conversation) {
          addMessage(data);
        }
      });
    }

    return () => {
      socket.unsubscribe(orgId);
    };
  }, [addMessage, findOrPullConversation, socket]);
};


export default {};

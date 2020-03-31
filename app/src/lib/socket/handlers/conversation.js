import { useContext, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

import { storage, get } from '@shared/lib';
import { mutation } from '@shared/graphql/conversations';

import { SocketContext } from '../socket';
import { MESSAGE_CREATED } from '../events';

export const useConversationListener = (conversationId) => {
  const socket = useContext(SocketContext);
  const client = useApolloClient();
  const addMessage = mutation.useMesageReceived();


  useEffect(() => {
    const orgId = get(storage, 'payload.organization.id');
    const userId = get(storage, 'payload.id');

    const channelId = `conversation_${conversationId}_${orgId}`;

    const subscribed = socket.channels.channels[channelId];

    if (!subscribed) {
      const channel = socket.subscribe(channelId);

      channel.bind(MESSAGE_CREATED, ({ data }) => {
        const { sender } = data;
        if (sender.id !== userId && conversationId === data.conversationId) {
          addMessage(data);
        }
      });
    }
  }, [addMessage, client.cache, conversationId, socket]);
};


export default {};

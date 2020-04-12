import { useContext, useEffect } from 'react';

import notify from '@/lib/notify';
import { storage, get } from '@shared/lib';
import emitter from '@/lib/emitter';
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

      channel.bind(MESSAGE_CREATED, async ({ data }) => {
        const conversation = await findOrPullConversation(data.conversationId, true);

        if (conversation) {
          addMessage(data);

          const { sender } = data;
          if (sender.id !== userId) {
            if (conversation.receiverType === 'user') {
              notify(`${sender.name} is talking to you`);
            } else if (conversation.receiverType === 'channel') {
              const { channel: conversationChannel } = conversation;
              notify(`1 new Girbil in ${conversationChannel.name}`);
            }
  
            emitter.emitEvent('update-badge');
          }
        }
      });
    }

    return () => {
      socket.unsubscribe(orgId);
    };
  }, [addMessage, findOrPullConversation, socket]);
};


export default {};

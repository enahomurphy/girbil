import { useContext } from 'react';

import { storage, get } from '@shared/lib';
import { mutation } from '@shared/graphql/conversations';

import { SocketContext } from '../socket';
import { MESSAGE_DELETED } from '../events';

export const useConversationListener = (conversationId) => {
  const socket = useContext(SocketContext);
  const deleteMessage = mutation.useMessageDeleted();

  const orgId = get(storage, 'payload.organization.id');
  const userId = get(storage, 'payload.id');

  const channelId = `conversation_${conversationId}_${orgId}`;

  const subscribed = socket.channels.channels[channelId];

  if (!subscribed) {
    const channel = socket.subscribe(channelId);

    channel.bind(MESSAGE_DELETED, ({ data }) => {
      const { sender } = data;
      if (sender.id !== userId && conversationId === data.conversationId) {
        deleteMessage(data);
      }
    });
  }
};


export default {};

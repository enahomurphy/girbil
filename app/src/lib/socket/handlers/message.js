import { useContext, useEffect } from 'react';

import { storage, get } from '@shared/lib';
import { query, mutation } from '@shared/graphql/conversations';
import { SocketContext } from '../socket';
import { MESSAGE_CREATED } from '../events';

export const useOrgListener = () => {
  const socket = useContext(SocketContext);
  const findOrPullConversation = query.useFindOrPullConversation();
  const addMessage = mutation.useMesageReceived();

  useEffect(() => {
    const userId = get(storage, 'payload.id');
    const orgId = get(storage, 'payload.organization.id');

    const channel = socket.subscribe(orgId);
    channel.bind(MESSAGE_CREATED, ({ data }) => {
      const { users = [], message } = data;
      const conversation = findOrPullConversation(message.conversationId);

      console.log(data, conversation);
      if (users.includes(userId) && conversation) {
        addMessage(message);
      }
    });

    return () => {
      socket.unsubscribe(orgId);
    };
  }, [addMessage, findOrPullConversation, socket]);
};


export default {};

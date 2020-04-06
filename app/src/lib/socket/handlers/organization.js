import { useContext, useEffect } from 'react';

import { storage, get } from '@shared/lib';
import { mutation as userMutation } from '@shared/graphql/user';
import { SocketContext } from '../socket';

export const useOrgListener = () => {
  const socket = useContext(SocketContext);
  const updateUserPresence = userMutation.useUpdateUserPresence();

  useEffect(() => {
    const orgId = get(storage, 'payload.organization.id');

    const channelId = `private-${orgId}`;
    const channelPresenceId = `presence-${orgId}`;

    const subscribed = socket.channels.channels[channelId];
    const channelPresenceSubscribed = socket.channels.channels[channelId];

    if (!subscribed) {
      const channel = socket.subscribe(channelId);
      channel.bind('ANOUNCEMENT', () => {

      });
    }

    if (!channelPresenceSubscribed) {
      const channel = socket.subscribe(channelPresenceId);

      channel.bind('pusher:subscription_succeeded', ({ members }) => {
        Object.keys(members).forEach((key) => {
          updateUserPresence({ id: key, isActive: true });
        });
      });

      channel.bind('pusher:member_added', ({ id }) => {
        updateUserPresence({ id });
      });

      channel.bind('pusher:member_removed', ({ id }) => {
        updateUserPresence({ id, isActive: false });
      });
    }

    return () => {
      socket.unsubscribe(orgId);
    };
  }, [socket, updateUserPresence]);
};

export default {};

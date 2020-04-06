import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { query } from '@shared/graphql/conversations';
import { setIconBadge } from '@/lib/electron';
import emitter from '@/lib/emitter';


export const useBadgeUpdate = () => {
  const [getUnreadCount] = useLazyQuery(
    query.GET_UNREAD_COUNT,
    { onCompleted: ({ unreadCount }) => setIconBadge(unreadCount) },
  );

  useEffect(() => {
    const handler = () => {
      getUnreadCount();
    };

    emitter.onLastListenedEventEmitted('update-badge', handler);
    return () => emitter.removeListener();
  }, [getUnreadCount]);
};


export default { useBadgeUpdate };

import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { query } from '@shared/graphql/conversations';
import { setIconBadge } from '@/lib/electron';
import emitter from '@/lib/emitter';

export const useBadgeUpdate = () => {
  const { refetch } = useQuery(
    query.GET_UNREAD_COUNT,
    { skip: true },
  );

  useEffect(() => {
    const handler = async () => {
      const { data: { unreadCount } } = await refetch();
      setIconBadge(unreadCount);
    };

    emitter.onLastListenedEventEmitted('update-badge', handler);
    return () => emitter.removeListener();
  }, [refetch]);
};


export default { useBadgeUpdate };

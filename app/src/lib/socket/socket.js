import { createContext } from 'react';
import Pusher from 'pusher-js';
import { storage } from '@shared/lib';

export const SocketContext = createContext();

export const socket = (isAuth) => {
  if (!isAuth) {
    return null;
  }

  const pusher = new Pusher(
    process.env.PUSHER_KEY,
    {
      cluster: process.env.PUSHER_CLUSTER,
      authEndpoint: `${process.env.API_URL}/socket/auth`,
      auth: {
        headers: {
          Authorization: `Beaerer ${storage.getItem('gb-token')}`,
        },
      },
    },
  );

  return pusher;
};

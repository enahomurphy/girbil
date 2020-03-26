import { createContext } from 'react';
import Pusher from 'pusher-js';

export const SocketContext = createContext();

export const socket = () => {
  const pusher = new Pusher(process.env.PUSHER_KEY, {
    cluster: process.env.PUSHER_CLUSTER,
  });

  return pusher;
};

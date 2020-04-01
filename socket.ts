import Pusher from 'pusher';
import { keys } from '../config';

export const pusher = new Pusher({
  appId: keys.pusher.appId,
  key: keys.pusher.key,
  secret: keys.pusher.secret,
  cluster: keys.pusher.cluster,
  encrypted: true,
});

export enum events {
  MESSAGE_CREATED = 'message_created',
  MESSAGE_DELETED = 'message_deleted',
  MESSAGE_READ = 'message_read',
  MESSAGE_UNREAD = 'message_unread',

  USER_ONLINE = 'user_online',
  USER_OFFLINE = 'user_offline',
}

export const broadcast = (channel: string, event: events, data: any): void => {
  const formatData = {
    event,
    timestamp: new Date(),
    data,
  };

  pusher.trigger(channel, event, formatData);
};

export default pusher;

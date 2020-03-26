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
  MESSAGE_CREATED = 'message-created',
  MESSAGE_DELETED = 'message-deleted',
  MESSAGE_READ = 'message-read',
  MESSAGE_UNREAD = 'message-unread',

  USER_ONLINE = 'user-online',
  USER_OFFLINE = 'user-offline',
}

export const broadcast = (channel: string, event: events, data: any): void => {
  pusher.trigger(channel, event, { data });
};

export default pusher;

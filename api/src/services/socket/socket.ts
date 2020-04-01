
import Pusher from 'pusher';
import { keys } from '../../config';


export const pusher = new Pusher({
  appId: keys.pusher.appId,
  key: keys.pusher.key,
  secret: keys.pusher.secret,
  cluster: keys.pusher.cluster,
  encrypted: true,
});

export const broadcast = (channel: string, event: events, data: any): void => {
  const formatData = {
    event,
    timestamp: new Date(),
    data,
  };

  pusher.trigger(channel, event, formatData);
};

export default pusher;

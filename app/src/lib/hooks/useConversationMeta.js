import { get } from '@shared/lib';

const conversationMeta = (conversation) => {
  const {
    id,
    receiverType,
    receiver,
    channel,
  } = conversation;

  const data = {
    id,
    name: get(receiver || channel, 'name'),
    typeId: get(receiver || channel, 'id', ''),
    isPrivate: get(receiver || channel, 'isPrivate', false),
    avatar: get(receiver || channel, 'avatar', false),
    isChannel: receiverType === 'channel',
    members: get(receiver || channel, 'members', 0),
  };

  return data;
};


export default conversationMeta;

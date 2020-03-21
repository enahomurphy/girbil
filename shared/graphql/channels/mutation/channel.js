import { useMutation } from '@apollo/client';
import { USER_CONVERSATIONS } from '../../conversations/query';
import { LEAVE_CHANNEL } from './mutation';


export const useLeaveChannel = () => {
  const [leaveChannel] = useMutation(LEAVE_CHANNEL);

  const handelLeaveChannel = (channelId) => () => {
    leaveChannel({
      variables: { channelId },
      update: (store) => {
        const data = store.readQuery({
          query: USER_CONVERSATIONS,
        });
        const newConverse = data.conversations.filter(({ channel }) => {
          if (channel && channel.id === channelId) return false;

          return true;
        });

        store.writeQuery({
          query: USER_CONVERSATIONS,
          data: { conversations: newConverse },
        });
      },
    });
  };

  return [handelLeaveChannel];
};

export default {};

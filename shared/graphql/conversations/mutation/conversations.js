import { useMutation } from '@apollo/client';
import { CLOSE_CONVERSATION } from './mutation';
import { USER_CONVERSATIONS } from '../query';


export const useCloseConversation = () => {
  const [closeConversation] = useMutation(CLOSE_CONVERSATION);

  const handelCloseConversations = (conversationId) => () => {
    closeConversation({
      variables: { conversationId },
      update: (store) => {
        const data = store.readQuery({
          query: USER_CONVERSATIONS,
        });
        const newConverse = data.conversations.filter(({ id }) => id !== conversationId);

        store.writeQuery({
          query: USER_CONVERSATIONS,
          data: { conversations: newConverse },
        });
      },
    });
  };

  return [handelCloseConversations];
};

export default {};

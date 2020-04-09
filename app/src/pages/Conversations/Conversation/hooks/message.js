import { f7 } from 'framework7-react';

export const useGoBack = ({ message, isThread }) => {
  const handler = () => {
    if (isThread) {
      f7.views.conversationThread.router.back(
        `/conversations/${message.conversationId}/thread/${message.parentId}/record`,
        { force: true },
      );
    } else {
      f7.views.conversation.router.back(
        `/conversations/${message.conversationId}/record`,
        { force: true },
      );
    }
  };

  return handler;
};

export default {};

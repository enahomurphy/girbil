import { useEffect } from 'react';
import { f7 } from 'framework7-react';

import { mutation } from '@shared/graphql/conversations';
import emitter from '@/lib/emitter';

export const useGoBack = ({ message, isThread }) => {
  const handler = () => {
    if (isThread) {
      f7.views.conversationThread.router.back(
        `/conversations/${message.conversationId}/thread/record`,
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

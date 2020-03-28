import { useEffect } from 'react';
import { f7 } from 'framework7-react';

import { mutation } from '@shared/graphql/conversations';
import emitter from '@/lib/emitter';

export const useReadEvent = (getMessage) => {
  const [markAsRead] = mutation.useMarkMessage('read');

  useEffect(() => {
    const handleReadMessage = (args) => {
      const variables = {
        conversationId: args.message.conversationId,
        messageId: args.message.id,
        threadId: args.threadId,
      };

      if (!args.message.hasRead) {
        markAsRead(variables);
      }
    };

    emitter.onLastListenedEventEmitted('read_message', handleReadMessage);
    return () => emitter.removeListener('read_message', handleReadMessage);
  }, [getMessage, markAsRead]);
};

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

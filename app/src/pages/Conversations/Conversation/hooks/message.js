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

    emitter.onEventEmitted('read_message', handleReadMessage);
    return () => emitter.removeListener('read_message', handleReadMessage);
  }, [getMessage, markAsRead]);
};

export const useGoBack = ({ message, isThread, messageId }) => {
  const [updateState] = mutation.useMessageState();

  const handler = () => {
    updateState({
      conversationId: message.conversationId,
      messageId: message.id,
      threadId: isThread && messageId,
      state: 'done',
    });

    const link = isThread
      ? `/conversations/${message.conversationId}/thread/${message.id}/`
      : `/conversations/${message.conversationId}/record`;

    f7.views.conversation.router.navigate(
      link,
      { transition: 'f7-fade' },
    );
  };

  return handler;
};

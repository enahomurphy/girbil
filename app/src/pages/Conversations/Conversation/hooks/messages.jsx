import React, { useEffect } from 'react';
import Emoji from '@/components/Emoji';
import { storage, get } from '@shared/lib';
import { f7 } from 'framework7-react';

import { mutation } from '@shared/graphql/conversations';
import emitter from '@/lib/emitter';

export const getPullOverLinks = ({
  message: {
    id, hasRead, sender, conversationId,
  },
  markMessage,
  deleteMessage,
}) => {
  const options = [
    {
      type: 'emoji',
      Component: () => (
        <Emoji
          reaction={false}
          vertical={false}
          onClick={console.info}
        />
      ),
    },
    {
      type: 'thread',
      link: `/conversations/${conversationId}/thread/${id}`,
      title: 'Start a thread',
      onClick: () => {},
    },
    {
      type: 'watch',
      title: `Mark as ${hasRead ? 'unwatched' : 'watched'}`,
      onClick: markMessage,
    },
  ];

  if (get(storage, 'payload.id') === sender.id) {
    options.push({
      type: 'delete video',
      title: 'delete video',
      onClick: () => deleteMessage(id),
    });
  }

  return options;
};

export const useFormatMessages = (messages = []) => {
  const [markAsUnRead] = mutation.useMarkMessage('unread');
  const [markAsRead] = mutation.useMarkMessage('read');
  const [deleteMessage] = mutation.useDeleteMessage();

  return messages.map((message) => ({
    ...message,
    pullover: getPullOverLinks({
      message,
      deleteMessage: () => {
        deleteMessage({
          messageId: message.id,
          conversationId: message.conversationId,
          threadId: message.parentId,
        }, () => {
          f7.views.conversation.router.navigate(`/conversations/${message.conversationId}/record`);
        });
      },
      markMessage: () => (message.hasRead ? markAsUnRead : markAsRead)({
        conversationId: message.conversationId,
        messageId: message.id,
        threadId: message.parentId,
      }),
    }),
    link: '#',
  }));
};


const changeRoute = (message) => {
  const link = message.parentId
    ? `/conversations/${message.conversationId}/thread/${message.parentId}/messages/${message.id}`
    : `/conversations/${message.conversationId}/messages/${message.id}`;

  (f7.views.conversation || f7.views.current).router.navigate(
    link,
    {
      ignoreCache: true,
      props: {
        message,
        isThread: Boolean(message.parentId),
      },
    },
  );
};

export const useMessageClicked = (messages) => {
  const handler = (id) => {
    const message = messages.find(({ id: mId }) => id === mId);
    if (message) {
      const state = message.state === 'playing' ? 'pause' : 'playing';
      emitter.emitEvent('play_message', { message, state });
      changeRoute(message);
    }
  };

  return handler;
};

export const useReadEvent = (getMessage) => {
  const [markAsRead] = mutation.useMarkMessage('read');

  useEffect(() => {
    const handleReadMessage = (args) => {
      const variables = { messageId: args.message.id };

      if (!args.message.hasRead) {
        markAsRead(variables);
      }
    };

    emitter.onLastListenedEventEmitted('read_message', handleReadMessage);
    return () => emitter.removeListener('read_message', handleReadMessage);
  }, [getMessage, markAsRead]);
};

export const usePlayerPlayPauseEvents = (threadId) => {
  const [updateState] = mutation.useMessageState();

  useEffect(() => {
    const handler = ({ message, state }) => {
      updateState({ messageId: message.id, state });
    };

    emitter.onLastListenedEventEmitted('play_message', handler);
  }, [threadId, updateState]);
};

export const usePlayerPrevNextEvent = (messages) => {
  const [updateState] = mutation.useMessageState();

  useEffect(() => {
    const getNextMessage = ({ id, action }) => {
      const messageLength = messages.length - 1;
      const messageIndex = messages.findIndex((mId) => mId.id === id);
      const hasMessage = (messageIndex > -1);

      if (hasMessage && action === 'next') {
        const isLast = messageIndex === messageLength;

        if (isLast) {
          return null;
        }

        return messages[messageIndex + 1];
      }

      if (hasMessage && action === 'prev') {
        const isFirst = messageIndex === 0;

        if (isFirst) {
          return null;
        }

        return messages[messageIndex - 1];
      }

      return null;
    };

    const handler = ({ id, action }) => {
      const message = getNextMessage({ id, action });

      if (message) {
        updateState({
          conversationId: message.conversationId,
          messageId: message.id,
          threadId: message.parentId,
          state: 'playing',
        });

        changeRoute(message);
      }
    };

    emitter.onLastListenedEventEmitted('next_message', handler);

    return () => {
      emitter.removeListener('next_message', handler);
    };
  }, [messages, updateState]);
};

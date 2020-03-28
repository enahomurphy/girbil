import React, { useEffect } from 'react';
import Emoji from '@/components/Emoji';
import { storage, get } from '@shared/lib';
import { f7 } from 'framework7-react';

import { mutation } from '@shared/graphql/conversations';
import emitter from '@/lib/emitter';

export const getPullOverLinks = ({
  conversationId,
  message: { id, hasRead, sender },
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
      link: `/conversations/${conversationId}/thread/${id}/`,
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

export const useFormatMessages = (messages = [], threadId) => {
  const [markAsUnRead] = mutation.useMarkMessage('unread');
  const [markAsRead] = mutation.useMarkMessage('read');
  const [deleteMessage] = mutation.useDeleteMessage();

  return messages.map((message) => ({
    ...message,
    pullover: getPullOverLinks({
      conversationId: messages.conversationId,
      message,
      deleteMessage: () => {
        deleteMessage({
          messageId: message.id,
          conversationId: message.conversationId,
          threadId: message.parentId,
        }, () => {
          f7.views.main.router.navigate(`/conversations/${message.conversationId}`);
        });
      },
      markMessage: () => (message.hasRead ? markAsUnRead : markAsRead)({
        conversationId: messages.conversationId,
        messageId: message.id,
        threadId,
      }),
    }),
    link: '#',
  }));
};


const changeRoute = (message) => {
  const link = message.parentId
    ? `/conversations/${message.conversationId}/thread/${message.parentId}/message/${message.id}`
    : `/conversations/${message.conversationId}/messages/${message.id}`;

  f7.views.conversation.router.navigate(
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
  const [updateState] = mutation.useMessageState();

  const handler = (id) => {
    const message = messages.find(({ id: mId }) => id === mId);
    if (message) {
      const onUpdate = () => {
        emitter.emitEvent('read_message', {
          threadId: message.parentId,
          message,
        });
      };
      updateState(
        {
          messageId: id,
          state: 'toggle',
        },
        onUpdate,
      );
      changeRoute(message);
    }
  };

  return handler;
};

export const usePlayerEvents = (threadId) => {
  const [updateState] = mutation.useMessageState();

  useEffect(() => {
    const handler = ({ message, state }) => {
      updateState({
        conversationId: message.conversationId,
        messageId: message.id,
        threadId,
        state,
      });
    };

    emitter.onEventEmitted('play_message', handler);
    emitter.onEventEmitted('pause_message', handler);
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

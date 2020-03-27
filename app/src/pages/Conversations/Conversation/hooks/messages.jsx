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

export const usePrevNextEvents = (threadId) => {
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


export const useMessageClicked = ({
  messages, isThread, threadId, conversationId,
}) => {
  const [updateState] = mutation.useMessageState();

  const handler = (id) => {
    const link = isThread
      ? `/conversations/${conversationId}/thread/${threadId}/message/${id}`
      : `/conversations/${conversationId}/${id}`;

    const onUpdate = () => {
      const message = messages.find(({ id: mId }) => id === mId);
      emitter.emitEvent('read_message', {
        threadId: message.parentId,
        message,
      });
    };
    updateState(
      {
        conversationId,
        messageId: id,
        threadId,
        state: 'toggle',
      },
      onUpdate,
    );

    f7.views.main.router.navigate(
      link,
      {
        animate: 'f7-dive',
        props: {
          messageId: id,
          threadId,
          isThread,
          conversationId,
        },
      },
    );
  };

  return handler;
};

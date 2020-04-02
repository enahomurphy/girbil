import React, { useEffect } from 'react';
import Emoji from '@/components/Emoji';
import { storage, get } from '@shared/lib';
import { f7 } from 'framework7-react';

import { mutation } from '@shared/graphql/conversations';
import emitter from '@/lib/emitter';

export const router = (threadId) => f7.views[threadId ? 'conversationThread' : 'conversation'].router;

export const changeRoute = (message) => {
  const isThread = get(message, 'parentId', false);
  const options = {
    reloadCurrent: true,
    props: {
      message,
      isThread,
    },
  };

  if (isThread) {
    f7.views.conversationThread.router.navigate(
      `/conversations/${message.conversationId}/thread/${message.parentId}/messages/${message.id}`,
      { reloadCurrent: true },
    );
  } else {
    f7.views.conversation.router.navigate(
      `/conversations/${message.conversationId}/messages/${message.id}`,
      options,
    );
  }
};

export const getPullOverLinks = ({
  message: {
    id, hasRead, sender, conversationId, replyCount, parentId,
  },
  markMessage,
  deleteMessage,
  handleReact,
}) => {
  const options = [
    {
      type: 'emoji',
      Component: () => (
        <Emoji
          reaction={false}
          vertical={false}
          onClick={(reaction) => handleReact(id, reaction.value)}
        />
      ),
    },
  ];

  if (!parentId) {
    options.push({
      type: 'thread',
      title: `${replyCount > 0 ? 'Replies' : 'Start a thread'}`,
      onClick: () => {
        f7.views.main.router.navigate(`/conversations/${conversationId}/thread/${id}`);
      },
    });
  }

  options.push(
    {
      type: 'watch',
      title: `Mark as ${hasRead ? 'unwatched' : 'watched'}`,
      onClick: markMessage,
    },
  );

  if (get(storage, 'payload.id') === sender.id) {
    options.push({
      type: 'delete',
      title: 'Delete video',
      onClick: () => deleteMessage(),
    });
  }

  return options;
};

export const useFormatMessages = (messages = []) => {
  const [markAsUnRead] = mutation.useMarkMessage('unread');
  const [markAsRead] = mutation.useMarkMessage('read');
  const [deleteMessage] = mutation.useDeleteMessage();
  const [reactToMessage] = mutation.useAddReaction();

  return messages.map((message) => ({
    ...message,
    pullover: getPullOverLinks({
      message,
      deleteMessage: () => {
        deleteMessage({
          messageId: message.id,
          conversationId: message.conversationId,
        });
      },
      markMessage: () => (message.hasRead ? markAsUnRead : markAsRead)({
        conversationId: message.conversationId,
        messageId: message.id,
        threadId: message.parentId,
      }),
      handleReact: (messageId, reaction) => {
        reactToMessage({
          messageId,
          reaction,
        });
      },
    }),
    link: '#',
  }));
};

export const useMessageClicked = (messages) => {
  const handler = (id) => {
    const message = messages.find(({ id: mId }) => id === mId);

    if (message.state === 'done') {
      changeRoute(message);
    } else if (['playing', 'pause'].includes(message.state)) {
      const stateMap = {
        playing: 'pause',
        pause: 'playing',
        done: 'pause',
      };
      emitter.emitEvent('play_message', { message, state: stateMap[message.state] });
    }
  };

  return handler;
};

export const useReadEvent = (getMessage) => {
  const [markAsRead] = mutation.useMarkMessage('read');

  useEffect(() => {
    const handleReadMessage = (args) => {
      const variables = {
        messageId: args.message.id,
        conversationId: args.message.conversationId,
      };

      if (!args.message.hasRead) {
        markAsRead(variables);
      }
    };

    emitter.onLastListenedEventEmitted('read_message', handleReadMessage);
    return () => emitter.removeListener('read_message', handleReadMessage);
  }, [getMessage, markAsRead]);
};

export const usePlayerPlayPauseEvents = (id, control) => {
  const [updateState] = mutation.useMessageState();

  useEffect(() => {
    const handler = ({ message, state }) => {
      updateState({ messageId: message.id, state });

      control.toggle(state);
    };

    emitter.onLastListenedEventEmitted('play_message', handler);
    return () => {
      emitter.removeListener('play_message', handler);
    };
  }, [control, id, updateState]);
};

export const usePlayerPrevNextEvent = (messages) => {
  const [updateState] = mutation.useMessageState();

  useEffect(() => {
    const getNextMessage = ({ id, action }) => {
      const messageLength = messages.length - 1;
      const messageIndex = messages.findIndex((mId) => mId.id === id);
      const hasMessage = (messageIndex > -1);

      const isLast = (hasMessage && action === 'next') && messageIndex === messageLength;
      const isFirst = (hasMessage && action === 'prev') && messageIndex === 0;
      let message = null;

      if (!isLast && action === 'next') {
        message = messages[messageIndex + 1];
      }

      if (!isFirst && action === 'prev') {
        message = messages[messageIndex - 1];
      }

      return { message, isLast, isFirst };
    };

    const handler = ({ id, action }) => {
      const { message, isLast } = getNextMessage({ id, action });

      if (isLast) {
        const { conversationId, parentId } = messages[0];
        if (parentId) {
          router(parentId).back(
            `/conversations/${conversationId}/thread/${parentId}/record`,
          );
        } else {
          router(parentId).back(
            `/conversations/${conversationId}/record`,
            { force: true },
          );
        }
      } else if (message) {
        changeRoute(message);
      }
    };

    emitter.onLastListenedEventEmitted('next_message', handler);

    return () => {
      emitter.removeListener('next_message', handler);
    };
  }, [messages, updateState]);
};

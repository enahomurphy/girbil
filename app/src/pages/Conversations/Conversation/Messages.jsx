import React, { useEffect } from 'react';
import { f7 } from 'framework7-react';
import PropTypes from 'prop-types';

import { query, mutation } from '@shared/graphql/conversations';
import Gallery from '@/components/Gallery';
import Emoji from '@/components/Emoji';
import emitter from '@/lib/emitter';

import EmptyState from './EmptyMessage';

const getPullOverLinks = ({
  conversationId,
  message: { id, hasRead },
  markMessage,
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
    {
      type: 'delete video',
      title: 'delete video',
      onClick: () => {},
    },
  ];

  return options;
};

const Messages = ({
  conversationId, threadId, isThread,
}) => {
  const [loadMessage, { messages, loading }] = query.useMessages(conversationId, threadId);
  const [updateState] = mutation.useMessageState();
  const [markAsUnRead] = mutation.useMarkMessage('unread');
  const [markAsRead] = mutation.useMarkMessage('read');

  useEffect(() => {
    loadMessage();
  }, [loadMessage]);

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


  const onClick = async (id) => {
    const link = isThread
      ? `/conversations/${conversationId}/thread/${threadId}/message/${id}`
      : `/conversations/${conversationId}/${id}`;

    const onUpdate = () => {
      emitter.emitEvent('read_message', {
        conversationId,
        messageId: id,
        threadId,
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

  if (loading) {
    return null;
  }

  const updatedMessages = messages.map((message) => ({
    ...message,
    pullover: getPullOverLinks({
      conversationId,
      message,
      markMessage: () => (message.hasRead ? markAsUnRead : markAsRead)({
        conversationId,
        messageId: message.id,
        threadId,
      }),
    }),
    link: '#',
  }));

  return (
    <>
      {
        messages.length ? (
          <Gallery messages={updatedMessages} onClick={onClick} />
        ) : (
          <EmptyState isThread={isThread} />
        )
      }
      {}
    </>
  );
};

Messages.defaultProps = {
  isThread: false,
  threadId: undefined,
};

Messages.propTypes = {
  isThread: PropTypes.bool,
  conversationId: PropTypes.string.isRequired,
  threadId: PropTypes.oneOfType([() => undefined, PropTypes.object]),
};


export default Messages;

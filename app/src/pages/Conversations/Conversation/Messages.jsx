import React, { useEffect } from 'react';
import { f7 } from 'framework7-react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

import { query, mutation } from '@shared/graphql/conversations';
import Gallery from '@/components/Gallery';
import Emoji from '@/components/Emoji';
import emitter from '@/lib/emitter';

const getPullOverLinks = (conversationId, { id }) => {
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
      type: 'unwatched',
      title: 'Mark as unwatched',
      onClick: () => {},
    },
  ];

  return options;
};

const Messages = ({
  conversationId, threadId, isThread,
}) => {
  const [updateState] = useMutation(mutation.UPDATE_MESSAGE_STATE);
  const [loadMessage, { messages, loading }] = query.useMessages(conversationId, threadId);

  useEffect(() => {
    loadMessage();
  }, [loadMessage]);

  useEffect(() => {
    const handler = ({ message, state }) => {
      updateState({
        variables: {
          conversationId: message.conversationId,
          messageId: message.id,
          threadId,
          state,
        },
      });
    };

    emitter.onEventEmitted('play_message', handler);
    emitter.onEventEmitted('pause_message', handler);
  }, [threadId, updateState]);

  const onClick = async (id) => {
    const link = isThread
      ? `/conversations/${conversationId}/thread/${threadId}/message/${id}`
      : `/conversations/${conversationId}/${id}`;

    updateState({
      variables: {
        conversationId,
        messageId: id,
        threadId,
        state: 'toggle',
      },
      update: () => {
        emitter.emitEvent('read_message', {
          conversationId,
          messageId: id,
          threadId,
        });
      },
    });

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
    pullover: getPullOverLinks(conversationId, message),
    link: '#',
  }));

  return (
    <Gallery messages={updatedMessages} onClick={onClick} />
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

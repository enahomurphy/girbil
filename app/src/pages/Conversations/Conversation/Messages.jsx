import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { f7 } from 'framework7-react';
import PropTypes from 'prop-types';

import Gallery from '@/components/Gallery';
import Emoji from '@/components/Emoji';
import { mutation, query } from '@shared/graphql/conversations';

const getPullOverLinks = (conversationId, isThread, { id }) => {
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
  ];

  if (!isThread) {
    options.push({
      type: 'thread',
      link: `/conversations/${conversationId}/${id}/thread/`,
      title: 'Start a thread',
      onClick: () => {},
    });
  }

  options.push({
    type: 'unwatched',
    title: 'Mark as unwatched',
    onClick: () => {},
  });

  return options;
};


const Messages = ({ conversationId, threadId, isThread }) => {
  const [loadMessage, { messages, loading }] = query.useMessages(conversationId, threadId);
  const [readMessage] = useMutation(mutation.READ_MESSAGE);

  useEffect(() => {
    loadMessage();
  }, [loadMessage]);

  const onClick = (id) => {
    readMessage({
      variables: {
        id,
        conversationId,
      },
    });

    const link = isThread
      ? `/conversations/${conversationId}/${threadId}/thread/${id}`
      : `/conversations/${conversationId}/${id}`;

    f7.views.main.router.navigate(
      link,
      {
        animate: 'f7-dive',
        props: {
          messageId: id,
          threadId: id,
          isThread,
          conversationId,
        },
        ignoreCache: true,
      },
    );
  };

  if (loading) {
    return null;
  }

  const updatedMessages = messages.map((message) => ({
    ...message,
    pullover: getPullOverLinks(conversationId, isThread, message),
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

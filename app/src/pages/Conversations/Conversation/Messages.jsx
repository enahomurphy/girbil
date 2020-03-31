import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { query } from '@shared/graphql/conversations';
import Gallery from '@/components/Gallery';

import {
  useFormatMessages, changeRoute,
  useMessageClicked, usePlayerPrevNextEvent, useReadEvent,
} from './hooks/messages';
import EmptyState from './EmptyMessage';

const Messages = ({
  conversationId, threadId, isThread,
}) => {
  const [loaded, setLoaded] = useState(false);

  const [loadMessage, { messages, loading }] = query.useMessages(conversationId, threadId);
  const updatedMessages = useFormatMessages(messages);
  const onClick = useMessageClicked(messages);

  usePlayerPrevNextEvent(messages, isThread, threadId);
  useReadEvent();

  useEffect(() => {
    if (!loaded && messages.length) {
      const message = messages.find(({ hasRead }) => !hasRead);
      if (message) {
        changeRoute(message);
      }

      setLoaded(true);
    }
  }, [loaded, messages]);

  useEffect(() => {
    loadMessage();
  }, [loadMessage]);

  if (loading) {
    return null;
  }

  return (
    messages.length ? (
      <Gallery messages={updatedMessages} onClick={onClick} />
    ) : (
      <EmptyState isThread={isThread} />
    )
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

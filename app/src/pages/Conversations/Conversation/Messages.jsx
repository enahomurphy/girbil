import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { query } from '@shared/graphql/conversations';
import Gallery from '@/components/Gallery';

import { usePlayerEvents, useFormatMessages, useMessageClicked } from './hooks/messages';
import EmptyState from './EmptyMessage';

const Messages = ({
  conversationId, threadId, isThread,
}) => {
  const [loadMessage, { messages, loading }] = query.useMessages(conversationId, threadId);
  const updatedMessages = useFormatMessages(messages);
  usePlayerEvents(threadId);

  useEffect(() => {
    loadMessage();
  }, [loadMessage]);

  const onClick = useMessageClicked({
    messages,
    isThread,
    threadId,
    conversationId,
  });

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

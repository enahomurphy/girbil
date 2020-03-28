import React from 'react';
import { View } from 'framework7-react';
import PropTypes from 'prop-types';

import { Page } from '@/components/Style';

import Messages from './Messages';
import { conversationRoutes } from './routes';

const Conversation = ({
  conversationId, threadId, isThread,
}) => (
  <Page overflow="hidden">
    <View
      routes={conversationRoutes}
      style={{ height: '676px' }}
      name="conversation"
      url={
        isThread
          ? `/conversations/${conversationId}/thread/${threadId}/record`
          : `/conversations/${conversationId}/record`
      }
    />
    <Messages
      isThread={Boolean(isThread)}
      threadId={threadId}
      conversationId={conversationId}
    />
  </Page>
);

Conversation.defaultProps = {
  isThread: false,
  threadId: undefined,
};

Conversation.propTypes = {
  isThread: PropTypes.bool,
  conversationId: PropTypes.string.isRequired,
  threadId: PropTypes.oneOfType([undefined, PropTypes.object]),
};

export default Conversation;

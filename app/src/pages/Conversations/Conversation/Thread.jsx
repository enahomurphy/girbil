import React from 'react';
import { Tabs, Tab } from 'framework7-react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Page } from '@/components/Style';

import Messages from './Messages';

const TabsWrapper = styled(Tabs)`
  height: calc(100vh - var(--gb-message-height));
`;

const Conversation = ({ conversationId, threadId }) => (
  <Page overflow="hidden">
    <TabsWrapper routable>
      <Tab id="thread-view" />
      <Tab id="thread-record" />
    </TabsWrapper>
    <Messages
      isThread
      threadId={threadId}
      conversationId={conversationId}
    />
  </Page>
);

Conversation.defaultProps = {
  threadId: undefined,
};

Conversation.propTypes = {
  conversationId: PropTypes.string.isRequired,
  threadId: PropTypes.oneOfType([undefined, PropTypes.object]),
};

export default Conversation;

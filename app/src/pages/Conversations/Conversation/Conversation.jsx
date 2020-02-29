import React from 'react';
import { Tabs, Tab } from 'framework7-react';
import styled from 'styled-components';
import { Page } from '@/components/Style';

import Messages from './Messages';

const TabsWrapper = styled(Tabs)`
  height: calc(100vh - var(--gb-message-height));
`;

const Conversation = () => (
  <Page overflow="hidden">
    <TabsWrapper routable>
      <Tab id="view" />
      <Tab id="record" />
    </TabsWrapper>
    <Messages />
  </Page>
);


export default Conversation;

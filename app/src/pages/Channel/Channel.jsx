import React from 'react';
import { Tabs, Tab, Link } from 'framework7-react';

import { Page } from '@/components/Style';
import Header from '@/components/Header';
import DirectMessages from './DirectMessages';
import BrowseChannels from './BrowseChannels';
import { Toolbar } from './style';

const Channel = () => (
  <Page name="channel">
    <Header title="Add Chat or Channel" />
    <Toolbar>
      <Link tabLink="#tab-1" tabLinkActive>Channels</Link>
      <div />
      <Link tabLink="#tab-2">Direct Messages</Link>
    </Toolbar>
    <Tabs swipeable>
      <Tab id="tab-1" className="page-content" tabActive>
        <BrowseChannels />
      </Tab>
      <Tab id="tab-2" className="page-content">
        <DirectMessages />
      </Tab>
    </Tabs>
  </Page>
);

export default Channel;

import React from 'react';
import {
  Page, Tabs, Tab, Link,
} from 'framework7-react';

import Header from '@/components/Header';
import DirectMessage from './DirectMessage';
import BrowseChannels from './BrowseChannels';
import { Toolbar } from './style';

const Channel = () => {
  const users = Array(10).fill(1).map((v, i) => ({
    id: v + i,
    name: 'Jae Park',
    lastActive: 'Active 17h ago',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/madebybrenton/128.jpg',
  }));

  const channels = Array(10).fill(1).map((v, i) => ({
    id: v + i,
    name: 'GirbilHQ',
    lastActive: 'Active 17h ago',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/madebybrenton/128.jpg',
  }));

  return (
    <Page name="channel">
      <Header title="Add Chat or Channel" />
      <Toolbar>
        <Link tabLink="#tab-1" tabLinkActive>Channels</Link>
        <div />
        <Link tabLink="#tab-2">Direct Messages</Link>
      </Toolbar>
      <Tabs swipeable>
        <Tab id="tab-1" className="page-content" tabActive>
          <BrowseChannels channels={channels} />
        </Tab>
        <Tab id="tab-2" className="page-content">
          <DirectMessage users={users} />
        </Tab>
      </Tabs>
    </Page>
  );
};

export default Channel;

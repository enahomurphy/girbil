
import React from 'react';
import {
  Page, List, ListItem,
} from 'framework7-react';
import styled from 'styled-components';
import { Text, Block } from '../../style';

import ConversationHeader from './ConversationHeader';
import ConversationListItem from './ConversationListItem';

const StyledUser = styled(Block)`
  padding: 0 16px;

  div {
    display: inline-block;
  }

  .active {
    width: 16px;
    height: 16px;
    border-radius: 100px;
    background: #33AB77;
    margin-right: 10px
  }
`;

const Conversation = () => (
  <Page>
    <ConversationHeader />
    <StyledUser type="flex" margin="0" align="center">
      <div className="active" />
      <Text color="#EFEFEF" margin="0" align="left">Jeff Whitlock</Text>
    </StyledUser>
    <List className="searchbar-not-found">
      <ListItem title="Nothing found" />
    </List>
    <List style={{ margin: '32px 0 0 0' }}>
      <ConversationListItem
        unreadCount={44}
        user={{
          id: 1,
          name: 'Becca smith',
          lastActive: 'Active 17h ago',
          avatar: 'https://cdn.framework7.io/placeholder/people-160x160-1.jpg',
        }}
      />
      <ConversationListItem
        unreadCount={0}
        user={{
          id: 1,
          name: 'Joseph Mann',
          lastActive: 'Active 17h ago',
          avatar: 'https://cdn.framework7.io/placeholder/people-160x160-1.jpg',
        }}
      />
    </List>
  </Page>
);

export default Conversation;

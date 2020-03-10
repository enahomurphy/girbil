
import React from 'react';
import { Page, List, ListItem } from 'framework7-react';

import { query } from '@shared/graphql/conversations';
import { Text } from '@/components/Style';
import ConversationHeader from './ConversationHeader';
import ConversationListItem from './ConversationListItem';
import { StyledUser, Active } from './style';

const Conversations = () => {
  const { conversations } = query.getUserConversations();

  return (
    <Page>
      <ConversationHeader />
      <StyledUser type="flex" margin="16px 0 0 0" align="center">
        <Active active />
        <Text color="#EFEFEF" margin="0" align="left">Jeff Whitlock</Text>
      </StyledUser>
      <List className="searchbar-not-found">
        <ListItem title="Nothing found" />
      </List>
      <List style={{ margin: '32px 0 0 0' }}>
        {
          conversations.map(({
            id, receiver, channel, receiverType,
          }) => (receiverType === 'user' ? (
            <ConversationListItem
              key={id}
              id={id}
              isChannel={false}
              isActive={false}
              isPrivate={false}
              unreadCount={0}
              user={{
                id: receiver.id,
                name: receiver.name,
                lastActive: 'Active 17h ago',
                avatar: receiver.avatar,
              }}
            />
          ) : (
            <ConversationListItem
              key={id}
              id={id}
              unreadCount={44}
              isActive={false}
              isChannel
              isPrivate
              user={{
                id: channel.id,
                name: channel.name,
                lastActive: 'Active 17h ago',
                avatar: channel.avatar,
                isPrivate: true,
              }}
            />
          )))
        }
      </List>
    </Page>
  );
};

export default Conversations;

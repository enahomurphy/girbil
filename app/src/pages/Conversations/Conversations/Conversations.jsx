
import React, { useEffect } from 'react';
import { Page, List, ListItem } from 'framework7-react';
import { useQuery } from '@apollo/react-hooks';

import { query } from '@shared/graphql/conversations';
import { Text } from '@/components/Style';
import { get } from '@shared/lib';
import ConversationHeader from './ConversationHeader';
import ConversationListItem from './ConversationListItem';
import { StyledUser } from './style';

const Conversations = () => {
  const { conversations } = query.getUserConversations();

  return (
    <Page>
      <ConversationHeader />
      <StyledUser type="flex" margin="16px 0 0 0" align="center">
        <div className="active" />
        <Text color="#EFEFEF" margin="0" align="left">Jeff Whitlock</Text>
      </StyledUser>
      <List className="searchbar-not-found">
        <ListItem title="Nothing found" />
      </List>
      <List style={{ margin: '32px 0 0 0' }}>
        {
          conversations.map(({ id, receiver, channel, receiverType }) => {
            return receiverType === 'user' ? (
              <ConversationListItem
                key={id}
                id={id}
                unreadCount={44}
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
                user={{
                  id: channel.id,
                  name: channel.name,
                  lastActive: 'Active 17h ago',
                  avatar: channel.avatar,
                }}
              />
            )
          })
        }
      </List>
    </Page>
  )
}

export default Conversations;

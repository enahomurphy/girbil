
import React from 'react';
import { Page, List, ListItem } from 'framework7-react';

import { storage } from '@shared/lib';
import { query } from '@shared/graphql/conversations';
import ConversationListItem from '@/components/List/ListItem';
import ConversationHeader from './ConversationHeader';
import UserInfo from './UserInfo';

const Conversations = () => {
  const { conversations } = query.getUserConversations();

  return (
    <Page>
      <ConversationHeader />
      <UserInfo user={storage.payload} />
      <List className="searchbar-not-found">
        <ListItem title="Nothing found" />
      </List>
      <List style={{ margin: '32px 0 0 0' }}>
        {
          conversations.map(({
            id, receiver, channel, receiverType,
          }) => (receiverType === 'user' ? (
            <ConversationListItem
              getLink={() => `/conversations/${id}/`}
              key={id}
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
              getLink={() => `/conversations/${id}/`}
              key={id}
              unreadCount={44}
              isActive={false}
              isChannel
              isPrivate={channel.isPrivate}
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

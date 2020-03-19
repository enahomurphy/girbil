
import React from 'react';
import { Page, List, ListItem } from 'framework7-react';

import { storage } from '@shared/lib';
import { query } from '@shared/graphql/conversations';
import ConversationListItem from '@/components/List/ListItem';
import ConversationHeader from './ConversationHeader';
import UserInfo from './UserInfo';

const Conversations = () => {
  const { conversations } = query.useGetUserConversations();

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
            id, receiver, channel, receiverType, unread,
          }) => (receiverType === 'user' ? (
            <ConversationListItem
              options={[
                {
                  title: 'View Profile',
                  getLink: () => `/users/${receiver.id}/profile`,
                  clickable: false,
                },
                {
                  title: 'Close Direct Message',
                  clickable: false,
                  onClick: () => {},
                },
              ]}
              getLink={() => `/conversations/${id}/`}
              key={id}
              id={id}
              isChannel={false}
              isActive={false}
              isPrivate={false}
              unreadCount={unread}
              user={{
                id: receiver.id,
                name: receiver.name,
                lastActive: 'Active 17h ago',
                avatar: receiver.avatar,
              }}
            />
          ) : (
            <ConversationListItem
              options={[
                {
                  title: 'View Channel',
                  getLink: () => `/channels/${channel.id}`,
                  clickable: false,
                },
                {
                  title: 'Leave Channel',
                  clickable: true,
                  onClick: () => {},
                },
              ]}
              getLink={() => `/conversations/${id}/`}
              key={id}
              unreadCount={unread}
              isActive={false}
              isChannel
              id={id}
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

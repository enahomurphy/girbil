
import React from 'react';
import { Page, List, ListItem } from 'framework7-react';
import { useMutation } from '@apollo/client';

import { storage } from '@shared/lib';
import { query } from '@shared/graphql/conversations';
import { mutation as channelMutations } from '@shared/graphql/channels';
import ConversationListItem from '@/components/List/ListItem';
import ConversationHeader from '../../../components/Header/ConversationHeader';
import UserInfo from './UserInfo';

const Conversations = () => {
  const { conversations } = query.useGetUserConversations();
  const [leaveChannel] = useMutation(channelMutations.LEAVE_CHANNEL);

  const handelLeaveChannel = (channelId) => () => {
    leaveChannel({
      variables: { channelId },
      update: (store) => {
        const data = store.readQuery({
          query: query.USER_CONVERSATIONS,
        });
        const newConverse = data.conversations.filter(({ channel }) => {
          if (channel && channel.id === channelId) return false;

          return true;
        });

        store.writeQuery({
          query: query.USER_CONVERSATIONS,
          data: { conversations: newConverse },
        });
      },
    });
  };

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
                  onClick: handelLeaveChannel(channel.id),
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

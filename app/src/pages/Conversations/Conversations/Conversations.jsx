
import React, { useState }  from 'react';
import { Page, List, ListItem } from 'framework7-react';

import { storage, get } from '@shared/lib';
import { useLazyQuery } from '@apollo/client';
import { useDebounce } from 'react-use';
import { query, mutation } from '@shared/graphql/conversations';
import { query as orgQuery } from '@shared/graphql/organizations';
import { mutation as channelMutations } from '@shared/graphql/channels';
import ConversationListItem from '@/components/List/ListItem';
import ConversationHeader from '../../../components/Header/ConversationHeader';
import UserInfo from './UserInfo';

const Conversations = () => {
  const { conversations } = query.useGetUserConversations();
  const [closeConversation] = mutation.useCloseConversation();
  const [leaveChannel] = channelMutations.useLeaveChannel();

  const [search, { data, loading }] = useLazyQuery(orgQuery.SEARCH_ORGANIZATION);
  const [searchText, setSearchText] = useState('');

  useDebounce(() => {
    if(searchText) search({ variables: { text: searchText } });
  },

  500,
  [searchText]);
  return (
    <Page>
      <ConversationHeader
        searchResult={get(data, 'searchOrganization', [])}
        closeConversation={closeConversation}
        leaveChannel={leaveChannel}
        handleSearch={setSearchText}/>
      <UserInfo user={get(storage, 'payload') || {}} />
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
                  onClick: closeConversation(id),
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
                  onClick: leaveChannel(channel.id),
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

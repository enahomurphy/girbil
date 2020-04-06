import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDebounce } from 'react-use';
import { List } from 'framework7-react';

import emitter from '@/lib/emitter';
import { storage, get } from '@shared/lib';
import { query, mutation } from '@shared/graphql/conversations';
import { query as orgQuery } from '@shared/graphql/organizations';
import { mutation as channelMutations } from '@shared/graphql/channels';
import { Page } from '@/components/Style';
import ConversationHeader from './ConversationHeader';
import EmptyConversation from './EmptyConversation';
import ConversationItem from './ConversationItem';

const Conversations = () => {
  const { conversations, loading } = query.useGetUserConversations(() => {
    emitter.emitEvent('update-badge');
  });
  const [closeConversation] = mutation.useCloseConversation();
  const [leaveChannel] = channelMutations.useLeaveChannel();

  const [search, { data }] = useLazyQuery(orgQuery.SEARCH_ORGANIZATION);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setSearchResult(get(data, 'searchOrganization', []));
  }, [data, setSearchResult]);

  useEffect(() => {
    if (!searchText) setSearchResult([]);
  }, [searchText, setSearchResult]);

  useDebounce(() => {
    if (searchText) search({ variables: { text: searchText } });
  },

  500,
  [searchText]);

  if (loading) return null;

  return (
    <Page>
      <ConversationHeader
        userData={get(storage, 'payload') || {}}
        searchResult={searchResult}
        closeConversation={closeConversation}
        leaveChannel={leaveChannel}
        handleSearch={setSearchText}
      />
      {
        conversations && conversations.length ? (
          <List style={{ margin: '32px 0 0 0' }}>
            {
              conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  leaveChannel={leaveChannel}
                  closeConversation={closeConversation}
                />
              ))
            }
          </List>
        ) : (
          <EmptyConversation />
        )
      }
    </Page>
  );
};

export default Conversations;

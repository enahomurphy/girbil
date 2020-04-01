import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDebounce } from 'react-use';

import { storage, get } from '@shared/lib';
import { query, mutation } from '@shared/graphql/conversations';
import { query as orgQuery } from '@shared/graphql/organizations';
import { mutation as channelMutations } from '@shared/graphql/channels';
import { useOrgMessageListener } from '@/lib/socket';
import ConversationList from '@/components/List/ConversationList';
import ConversationHeader from './ConversationHeader';
import EmptyConversation from './EmptyConversation';
import { Page } from './style';

const Conversations = () => {
  const { conversations, loading } = query.useGetUserConversations();
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

  useOrgMessageListener();

  useDebounce(() => {
    if (searchText) search({ variables: { text: searchText } });
  },

  500,
  [searchText]);

  if(loading) return null;

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
          <ConversationList
            conversations={conversations}
            leaveChannel={leaveChannel}
            closeConversation={closeConversation}
          />
        ) : (
          <EmptyConversation />
        )
      }
    </Page>
  );
};

export default Conversations;

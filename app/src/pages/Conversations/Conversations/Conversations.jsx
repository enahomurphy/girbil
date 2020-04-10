import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { useDebounce } from 'react-use';
import { List } from 'framework7-react';


import emitter from '@/lib/emitter';
import { storage, get } from '@shared/lib';
import { query, mutation } from '@shared/graphql/conversations';
import { query as orgQuery } from '@shared/graphql/organizations';
import { query as userQuery, mutation as userMutation } from '@shared/graphql/user';
import { mutation as channelMutations } from '@shared/graphql/channels';
import { PageWithScroll, ScrollableList } from '@/components/Style';
import ConversationHeader from './ConversationHeader';
import EmptyConversation from './EmptyConversation';
import ConversationItem from './ConversationItem';
import InviteWidget from './InviteWidget';

const Conversations = () => {
  const { conversations } = query.useGetUserConversations(() => {
    emitter.emitEvent('update-badge');
  });
  const [closeConversation] = mutation.useCloseConversation();
  const [leaveChannel] = channelMutations.useLeaveChannel();

  const { data: userSettingData } = useQuery(userQuery.USER_SETTINGS);

  const [search, { data }] = useLazyQuery(orgQuery.SEARCH_ORGANIZATION);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isWidgetHidden, setIsWidgetHidden] = useState(true);

  const [hideWidget] = useMutation(userMutation.UPDATE_USER_SETTINGS);

  useEffect(() => {
    setIsWidgetHidden(get(userSettingData, 'settings.settings.hideInviteWidget', false));
  }, [userSettingData]);

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

  const hideInviteWidget = async () => {
    setIsWidgetHidden(true);

    await hideWidget({
      variables: { hideInviteWidget: true },
    });
  };


  return (
    <PageWithScroll name="conversations">
      <ConversationHeader
        userData={get(storage, 'payload') || {}}
        searchResult={searchResult}
        closeConversation={closeConversation}
        leaveChannel={leaveChannel}
        handleSearch={setSearchText}
      />
      <ScrollableList>
        {
          conversations && conversations.length ? (
            <List style={{ margin: '32px 0 0 0', marginBottom: isWidgetHidden ? '90px' : '10px' }}>
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
        {
          isWidgetHidden
            ? null
            : <InviteWidget hideWidget={hideInviteWidget} />
        }
      </ScrollableList>
    </PageWithScroll>
  );
};

export default Conversations;

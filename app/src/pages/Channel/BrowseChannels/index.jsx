import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDebounce } from 'react-use';

import { query, mutation } from '@shared/graphql/channels';
import { query as conversationQuery } from '@shared/graphql/conversations';

import { get, storage } from '@shared/lib';
import { f7 } from 'framework7-react';
import BrowseChannels from './BrowseChannels';

const BrowseChannel = () => {
  const [value, setValue] = useState('');

  const [search, { data, loading }] = useLazyQuery(
    query.CHANNELS_NOT_A_MEMBER, { fetchPolicy: 'network-only' },
  );

  const addUsersToChannel = mutation.useAddUsersToChannel();

  useDebounce(() => {
    search({ variables: { text: value } });
  },

  500,
  [value]);

  const handleCreateChannel = () => {
    f7.views.main.router.navigate('/channels/create');
  };

  const joinChannel = (channel) => {
    f7.dialog.preloader('Joining to channel');
    addUsersToChannel(
      {
        variables: { channelId: channel.id, userIds: [storage.payload.id] },
        refetchQueries: [{ query: conversationQuery.USER_CONVERSATIONS }],
        onResolved: () => {
          f7.dialog.close();

          f7.views.main.router.navigate(
            `/conversations/${channel.conversation.id}/`,
            {
              clearPreviousHistory: true,
            },
          );
        },
      },
    );
  };

  return (
    <BrowseChannels
      loading={loading}
      handleSearchChange={setValue}
      channels={get(data, 'searchChannelsNotIn', []) || []}
      onCreateChannel={handleCreateChannel}
      joinChannel={joinChannel}
    />
  );
};

export default BrowseChannel;

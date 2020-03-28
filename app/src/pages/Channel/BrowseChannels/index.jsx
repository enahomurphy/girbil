import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDebounce } from 'react-use';

import { query } from '@shared/graphql/channels';

import { get } from '@shared/lib';
import { f7 } from 'framework7-react';
import BrowseChannels from './BrowseChannels';

const BrowseChannel = () => {
  const [search, { data, loading }] = useLazyQuery(
    query.SEARCH_CHANNELS, { fetchPolicy: 'network-only' },
  );
  const [value, setValue] = useState('');

  useDebounce(() => {
    search({ variables: { text: value } });
  },

  500,
  [value]);

  const handleCreateChannel = () => {
    f7.views.main.router.navigate('/channels/create');
  };

  return (
    <BrowseChannels
      loading={loading}
      handleSearchChange={setValue}
      channels={get(data, 'channels', [])}
      onCreateChannel={handleCreateChannel}
    />
  );
};

export default BrowseChannel;

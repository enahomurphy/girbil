import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDebounce } from 'react-use';

import { query } from '@shared/graphql/channels';

import { get } from '@shared/lib';
import BrowseChannels from './BrowseChannels';

const BrowseChannel = () => {
  const [search, { data, loading }] = useLazyQuery(query.SEARCH_CHANNELS);
  const [value, setValue] = useState('');

  useDebounce(() => {
    search({ variables: { text: value } });
  },

  500,
  [value]);

  return (
    <BrowseChannels
      loading={loading}
      handleSearchChange={setValue}
      channels={get(data, 'channels', [])}
    />
  );
};

export default BrowseChannel;

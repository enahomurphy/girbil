import React, { useState } from 'react';
import { useDebounce } from 'react-use';
import { useLazyQuery } from '@apollo/client';

import { query } from '@shared/graphql/conversations';
import { get } from '@shared/lib';

import DirectMessage from './DirectMessages';

const BrowseDirectMessage = () => {
  const [search, { data, loading }] = useLazyQuery(
    query.GET_USERS_WITHOUT_CONVERSATION,
    {
      fetchPolicy: 'network-only',
    },
  );
  const [value, setValue] = useState('');

  useDebounce(() => {
    search({ variables: { query: value } });
  },
  500,
  [value]);

  return (
    <DirectMessage
      loading={loading}
      handleSearchChange={setValue}
      users={get(data, 'usersWithoutConversation', [])}
      isSearching={Boolean(value)}
    />
  );
};

export default BrowseDirectMessage;

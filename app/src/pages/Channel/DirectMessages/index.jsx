import React, { useState } from 'react';
import { useDebounce } from 'react-use';
import { useLazyQuery, useMutation } from '@apollo/client';
import { f7 } from 'framework7-react';

import { query, mutation } from '@shared/graphql/conversations';
import { get } from '@shared/lib';

import DirectMessage from './DirectMessages';

const BrowseDirectMessage = () => {
  const [value, setValue] = useState('');
  const [search, { data, loading }] = useLazyQuery(
    query.GET_USERS_WITHOUT_CONVERSATION,
    {
      fetchPolicy: 'network-only',
    },
  );
  const [getConversation] = useMutation(mutation.GET_USER_CONVERSATION_OR_CREATE);


  const handleUserClick = async (userId) => {
    getConversation({
      variables: { userId },
      update(_, { data: { getUserConversationOrCreate: { id } } }) {
        f7.views.main.router.navigate(`/conversations/${id}/`);
      },
      refetchQueries: [{ query: query.USER_CONVERSATIONS }],
      awaitRefetchQueries: true,
    });
  };

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
      handleUserClick={handleUserClick}
    />
  );
};

export default BrowseDirectMessage;

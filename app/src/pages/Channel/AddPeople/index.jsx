import React, { useState, useEffect, useCallback } from 'react';
import { Page, f7 } from 'framework7-react';
import { useQuery, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

import Header from '@/components/Header';
import { query, mutation } from '@shared/graphql/channels';
import { query as conversationQuery } from '@shared/graphql/conversations';
import { get } from '@shared/lib';

import AddPeopleList from './AddPeopleList';

// @TODO handle error
const AddPeople = ({ channelId, $f7router }) => {
  const onError = () => f7.dialog.close();
  const onCompleted = () => {
    f7.dialog.close();
    $f7router.back();
  };

  const updateData = (organizationMembers) => (
    organizationMembers.map((user) => ({ ...user, selected: Boolean(user.selected) }))
  );
  const { data } = useQuery(
    query.GET_USERS_NOT_IN_CHANNEL,
    { variables: { channelId }, fetchPolicy: 'network-only' },
  );
  const [addUsersToChannel] = useMutation(
    mutation.ADD_USERS_TO_CHANNEL,
    {
      onCompleted,
      onError,
    },
  );

  const members = get(data, 'usersNotInChannel.members', []);
  const [users, setUsers] = useState(updateData(members));

  useEffect(() => {
    if (members && members.length) {
      setUsers(updateData(members));
    }
  }, [members]);

  const hasSelected = useCallback(
    () => Boolean(
      users.length && users.every((user) => !user.selected),
    ), [users],
  );

  const onUserSelected = (value) => {
    const updateUserState = users.map((user) => {
      if (user.id === value.id) {
        return { ...user, selected: !user.selected };
      }

      return user;
    });

    setUsers(updateUserState);
  };

  const onSubmit = () => {
    const userIds = users.reduce(
      (acc, value) => {
        if (value.selected) {
          acc.push(value.id);
        }
        return acc;
      },
      [],
    );

    if (userIds) {
      addUsersToChannel({
        variables: { channelId, userIds },
        refetchQueries: ['channelMembers', { query: conversationQuery.USER_CONVERSATIONS }],
        // update: (store, { data }) => {
        //   console.log(data);
        //   store.modify(
        //     store.identify({ __typename: 'Channel', id: channelId }),
        //     {
        //       members(value) {
        //         return value + 1;
        //       },
        //     },
        //   );
        // },
      });
    }

    f7.dialog.preloader('Adding users to channel');
  };

  return (
    (
      <Page>
        <Header title="Add People" />
        <AddPeopleList
          users={users}
          isValid={hasSelected()}
          onUserSelected={onUserSelected}
          onSubmit={onSubmit}
        />
      </Page>
    )
  );
};


AddPeople.propTypes = {
  $f7router: PropTypes.object.isRequired,
  channelId: PropTypes.string.isRequired,
};

export default AddPeople;

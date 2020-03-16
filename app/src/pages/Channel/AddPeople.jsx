import React, { useState, useEffect, useCallback } from 'react';
import { Page, List } from 'framework7-react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import Header from '@/components/Header';
import UserListItem from '@/components/List/UserListItem';
import { query } from '@shared/graphql/channels';
import { Text, Button, Block } from '@/components/Style';
import { get } from '@shared/lib';
import { StyledButton } from './style';

const AddPeople = ({ channelId }) => {
  const updateData = (organizationMembers) => (
    organizationMembers.map((user) => ({ ...user, selected: Boolean(user.selected) }))
  );
  const { data } = useQuery(query.GET_USERS_NOT_IN_CHANNEL, { variables: { channelId } });
  const members = get(data, 'usersNotInChannel.members', []);
  const [users, setUsers] = useState(updateData(members));

  useEffect(() => {
    setUsers(updateData(members));
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

  return (
    (
      <Page>
        <Header title="Add People" />
        <Block padding="0 2
        4px"
        >
          <Text margin="24px 0 32px 0">
            Important: People added to channel
            will have access to entire chat history—even in private channels.
          </Text>
          <List>
            {
              users.map((user) => (
                <UserListItem
                  key={user.id}
                  checkbox
                  checked={user.selected}
                  user={user}
                  link="#"
                  onChange={onUserSelected}
                  isActive={Boolean(user.isActive)}
                />
              ))
            }
          </List>
        </Block>
        <StyledButton>
          <Button
            size="18px"
            width="152px"
            height="40px"
            inverse
            disabled={hasSelected()}
          >
            Add People
          </Button>
        </StyledButton>
      </Page>
    )
  );
};


AddPeople.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default AddPeople;

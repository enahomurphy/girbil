import React from 'react';
import { Icon, List } from 'framework7-react';
import PropTypes from 'prop-types';

import ListItem from '@/components/List/ListItem';
import { invitePeopleOpener } from '@/lib';
import {
  Title, Text, Block, Search, Button, ScrollableList,
} from '@/components/Style';

import EmptyState from '../EmptyState';


const DirectMessage = ({
  users, handleSearchChange, loading, isSearching, handleUserClick,
}) => {
  if (!loading && !isSearching && !users.length) {
    return <EmptyState />;
  }

  return (
    <Block>
      <Block margin="0 24px">
        <Block
          margin="0 0 24px 0"
          type="flex"
          align="center"
          justify="space-between"
        >
          <Title size="21px">Browse DMs</Title>
          <Button
            inverse
            width="126px"
            onClick={invitePeopleOpener}
          >
            Invite People
          </Button>
        </Block>
        <Block margin="0 0 32px 0">
          <Search>
            <Icon f7="search" />
            <input
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Type to filter list..."
            />
          </Search>
        </Block>
        <Text
          color="var(--gb-medium-grey)"
          align="left"
        >
          People you haven’t added
        </Text>
      </Block>
      <ScrollableList height="475px">
        <List style={{ margin: '32px 0 0 0' }}>
          {
            users.map((user) => (
              <ListItem
                getLink={() => '#'}
                onClick={() => handleUserClick(user.id)}
                key={user.id}
                id={user.id}
                isChannel={false}
                isActive={false}
                isPrivate={false}
                user={user}
              />
            ))
          }
        </List>
      </ScrollableList>
    </Block>
  );
};

DirectMessage.propTypes = {
  users: PropTypes.array.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isSearching: PropTypes.bool.isRequired,
  handleUserClick: PropTypes.func.isRequired,
};

export default DirectMessage;

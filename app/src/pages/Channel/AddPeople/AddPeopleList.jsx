import React from 'react';
import { List, Icon } from 'framework7-react';
import PropTypes from 'prop-types';

import UserListItem from '@/components/List/UserListItem';
import {
  Text, Button, Block, Search, SearchBar,
} from '@/components/Style';
import { StyledButton } from '../style';


const AddPeople = ({
  users, onUserSelected, isValid, onSubmit, onFilter,
}) => (
  <>
    <Block padding="0 24px">
      <SearchBar>
        <div className="global-input">
          <Search>
            <Icon f7="search" />
            <input
              onChange={(e) => onFilter(e.target.value)}
              placeholder="Type to filter list..."
            />
          </Search>
        </div>
      </SearchBar>
      <Text margin="12px 0 32px 0">
        <span style={{fontWeight: 'bold'}}>Important: </span>People added to channel
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
              style={{ padding: '12px 0' }}
            />
          ))
        }
      </List>
    </Block>
    <StyledButton className="floating">
      <Button
        size="18px"
        width="152px"
        height="40px"
        inverse
        onClick={onSubmit}
        disabled={isValid}
      >
        Add People
      </Button>
    </StyledButton>
  </>
);


AddPeople.propTypes = {
  users: PropTypes.array.isRequired,
  isValid: PropTypes.bool.isRequired,
  onUserSelected: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default AddPeople;

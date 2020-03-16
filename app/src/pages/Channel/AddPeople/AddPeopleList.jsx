import React from 'react';
import { List } from 'framework7-react';
import PropTypes from 'prop-types';

import UserListItem from '@/components/List/UserListItem';
import { Text, Button, Block } from '@/components/Style';
import { StyledButton } from '../style';

const AddPeople = ({
  users, onUserSelected, isValid, onSubmit,
}) => (
  <>
    <Block padding="0 24px">
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
};

export default AddPeople;

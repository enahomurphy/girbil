import React from 'react';
import { Page, List } from 'framework7-react';

import Header from '@/components/Header';
import UserListItem from '@/components/List/UserListItem';
import { Text, Button, Block } from '@/components/Style';
import { StyledButton } from './style';

const AddPeople = () => {
  const users = Array(2).fill(1).map((v, i) => ({
    id: v + i,
    name: 'Jae Park',
    isActive: true,
    lastActive: 'Active 17h ago',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/madebybrenton/128.jpg',
  }));

  return (
    (
      <Page>
        <Header title="Add People" />
        <Block padding="0 24px">
          <Text margin="24px 0 32px 0">
            Important: People added to channel
            will have access to entire chat history—even in private channels.
          </Text>
          <List>
            {
              users.map((user) => (
                <UserListItem
                  checkbox
                  checked
                  user={user}
                  link="#"
                  isActive={user.isActive}
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
          >
            Add People
          </Button>
        </StyledButton>
      </Page>
    )
  );
};

export default AddPeople;

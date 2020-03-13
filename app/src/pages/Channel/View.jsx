import React from 'react';
import { Page, List } from 'framework7-react';

import Header from '@/components/Header';
import { UserAccount } from '@/components/Icon';
import UserListItem from '@/components/List/UserListItem';
import {
  Text, Title, Button, Block,
} from '@/components/Style';

const View = () => {
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
        <Header title="Channel details" />
        <Block padding="24px 24px">
          <Text margin="0 0 24px 0">
            Channels are spaces for open team communications.
            We recommend organizing them around a topic; e.g., design, marketing, development.
          </Text>
          <Block margin="0 0 24px 0">
            <Title
              weight="bold"
              size="12px"
              line="15px"
              margin="0 0 8px 0"
              color="var(--gb-medium-grey)"
            >
              Name
            </Title>
            <Title size="14px">#development</Title>
          </Block>
          <Block margin="0 0 24px 0">
            <Title
              weight="bold"
              size="12px"
              line="15px"
              margin="0 0 8px 0"
              color="var(--gb-medium-grey)"
            >
              Description (optional)
            </Title>
            <Title width="290px" size="14px">Discuss technical elements of building out product</Title>
          </Block>
          <Block margin="0 0 24px 0">
            <Title
              weight="bold"
              size="12px"
              line="15px"
              margin="0 0 8px 0"
              color="var(--gb-medium-grey)"
            >
              Private or public
            </Title>
            <Title size="14px">public</Title>
          </Block>

          <Block>
            <Title
              weight="bold"
              size="12px"
              line="15px"
              margin="0 0 8px 0"
              color="var(--gb-medium-grey)"
            >
              Members
            </Title>
            <Block type="flex" align="center">
              <UserAccount />
              <Title margin="0 0 0 10px">2 Members</Title>
            </Block>
          </Block>
          <List>
            {
              users.map((user) => (
                <UserListItem
                  user={user}
                  link="#"
                  isActive={user.isActive}
                />
              ))
            }
          </List>
          <Button
            size="18px"
            width="152px"
            height="40px"
          >
            Add People
          </Button>
        </Block>
      </Page>
    )
  );
};


View.propTypes = {
};

export default View;

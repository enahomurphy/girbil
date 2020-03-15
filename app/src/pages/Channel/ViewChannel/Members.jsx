import React from 'react';
import { List } from 'framework7-react';
import PropTypes from 'prop-types';

import { UserAccount } from '@/components/Icon';
import UserListItem from '@/components/List/UserListItem';
import { Title, Button, Block } from '@/components/Style';

const View = ({ members, count, channel }) => (
  <>
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
        <Title margin="0 0 0 10px">
          {count}
          {' '}
          Members
        </Title>
      </Block>
    </Block>
    <List>
      {
        members.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            link="#"
            isActive={Boolean(user.isActive)}
          />
        ))
      }
    </List>
    <Button
      size="18px"
      width="152px"
      height="40px"
      href={`/channels/${channel.id}/add-people`}
    >
      Add People
    </Button>
  </>
);


View.propTypes = {
  members: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  channel: PropTypes.object.isRequired,
};

export default View;

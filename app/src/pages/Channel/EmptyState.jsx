/* eslint-disable global-require */
import React from 'react';

import { invitePeopleOpener } from '@/lib';
import {
  Title, Text, Button, Block,
} from '@/components/Style';

const EmptyState = () => (
  <Block>
    <Title
      size="21px"
      line="26px"
      margin="0 0 0 24px"
    >
      Browse DMs
    </Title>
    <Block
      margin="48px 0 32px 0"
      type="flex"
      justify="center"
    >
      <img src="/assets/images/empty.jpg" alt="empty" />
    </Block>
    <Title
      align="center"
      size="30px"
      line="38px"
      weight="normal"
    >
      It’s lonely in here.
    </Title>
    <Text
      align="center"
      size="18px"
      line="23px"
      margin="0 0 64px 0"
    >
      No one has joined your Girbil organization.
      Invite teammates to start collaborating.
    </Text>
    <Block type="flex" justify="center">
      <Button
        size="18px"
        height="40px"
        width="150px"
        inverse
        onClick={invitePeopleOpener}
      >
        Invite People
      </Button>
    </Block>
  </Block>
);

EmptyState.propTypes = {

};

export default EmptyState;

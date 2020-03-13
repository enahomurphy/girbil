import React from 'react';
import { Icon } from 'framework7-react';

import {
  Title, Text, Block, Search, Button,
} from '@/components/Style';

const DirectMessage = () => (
  <Block margin="0 24px">
    <Block
      margin="0 0 24px 0"
      type="flex"
      align="center"
      justify="space-between"
    >
      <Title size="21px">Browse DMs</Title>
      <Button inverse width="126px">Invite People</Button>
    </Block>
    <Block margin="0 0 32px 0">
      <Search>
        <Icon f7="search" />
        <input placeholder="Type to filter list..." />
      </Search>
    </Block>
    <Text
      color="var(--gb-medium-grey)"
      align="left"
    >
      People you haven’t added
    </Text>
  </Block>
);

DirectMessage.propTypes = {

};

export default DirectMessage;

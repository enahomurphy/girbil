
import React from 'react';
import { Icon } from 'framework7-react';

import {
  Title, Text, Block, Search, Button,
} from '@/components/Style';

const BrowseChannels = () => (
  <Block margin="0 24px">
    <Block
      margin="0 0 24px 0"
      type="flex"
      align="center"
      justify="space-between"
    >
      <Title size="21px">Browse channels</Title>
      <Button inverse width="126px">Create Channel</Button>
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
      Organization channels you haven’t added
    </Text>
  </Block>
);

BrowseChannels.propTypes = {

};

export default BrowseChannels;

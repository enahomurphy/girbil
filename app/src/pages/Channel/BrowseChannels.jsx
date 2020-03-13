
import React from 'react';
import { Icon, List } from 'framework7-react';
import PropTypes from 'prop-types';

import ConversationListItem from '@/components/List/ConversationListItem';
import {
  Title, Text, Block, Search, Button,
} from '@/components/Style';

const BrowseChannels = ({ channels }) => (
  <Block>
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
    <List simple-list style={{ margin: '32px 0 0 0' }}>
      {
        channels.map((channel) => (
          <ConversationListItem
            key={true.id}
            id={true.id}
            isChannel
            isActive={false}
            isPrivate={false}
            user={channel}
          />
        ))
      }
    </List>
  </Block>
);

BrowseChannels.propTypes = {
  channels: PropTypes.array.isRequired,
};

export default BrowseChannels;

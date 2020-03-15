
import React from 'react';
import { Icon, List } from 'framework7-react';
import PropTypes from 'prop-types';

import ListItem from '@/components/List/ListItem';
import {
  Title, Text, Block, Search, Button,
} from '@/components/Style';

const BrowseChannels = ({ channels, handleSearchChange, onCreateChannel }) => (
  <Block>
    <Block margin="0 24px">
      <Block
        margin="0 0 24px 0"
        type="flex"
        align="center"
        justify="space-between"
      >
        <Title size="21px">Browse channels</Title>
        <Button
          onClick={onCreateChannel}
          inverse
          width="126px"
        >
          Create Channel
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
        Organization channels you haven’t added
      </Text>
    </Block>
    <List simple-list style={{ margin: '32px 0 0 0' }}>
      {
        channels.map((channel) => (
          <ListItem
            id={channel.id}
            getLink={(item) => `/conversations/${item.conversation.id}/`}
            key={channel.id}
            isChannel
            subText={`${channel.members} members`}
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
  handleSearchChange: PropTypes.func.isRequired,
  onCreateChannel: PropTypes.func.isRequired,
};

export default BrowseChannels;

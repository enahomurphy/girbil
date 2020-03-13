import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge, Link, ListItem, List,
} from 'framework7-react';

import { Block, Popover } from '@/components/Style';

const ConversationListInfo = ({ unreadCount }) => (
  <Block
    width="60px"
    type="flex"
    align="center"
    justify={unreadCount ? 'space-between' : 'flex-end'}
    padding="0"
  >
    {unreadCount && (<Badge color="red">{unreadCount}</Badge>)}
    <span>
      <Popover className="popover-menu">
        <List>
          <ListItem link="#" popoverClose title="View profile" />
          <ListItem link="#" popoverClose title="Close Direct Message" />
        </List>
      </Popover>
      <Link popoverOpen=".popover-menu" iconF7="ellipsis_vertical" color="white " />
    </span>
  </Block>
);

ConversationListInfo.propTypes = {
  unreadCount: PropTypes.number.isRequired,
};

export default ConversationListInfo;

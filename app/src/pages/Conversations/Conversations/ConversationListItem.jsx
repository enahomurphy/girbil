
import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Icon } from 'framework7-react';

import { Title, Text, Block } from '@/components/Style';
import { Lock } from '@/components/Icon';
import {
  Img, StyledListItem, Active, StyledTitle,
} from './style';

const ConversationListItem = ({
  unreadCount, user, id, isChannel, isPrivate, isActive,
}) => (
  <StyledListItem link={`/conversations/${id}/`}>
    <Block margin>
      <Block
        type="flex"
        align="flex-end"
        weight="600"
        margin="0 0 5px 0"
      >
        { (isChannel && !isPrivate) && <Title margin="0" width="20px">#</Title> }
        { (isChannel && isPrivate) && (
          <span style={{ margin: '0 5px 1px 0' }}>
            <Lock />
          </span>
        )}
        <StyledTitle>{` ${user.name}`}</StyledTitle>
        {
          !isChannel && <Active active={isActive} width="8px" height="8px" style={{ alignSelf: 'center' }} />
        }
      </Block>
      <Text margin="0" align="left">
        {
          unreadCount
            ? `${unreadCount} new ${unreadCount === 1 ? 'chat' : 'chats'}`
            : user.lastActive
        }
      </Text>
    </Block>
    <Block type="flex" align="center" justify="center" padding="0">
      {unreadCount && (<Badge color="red">{unreadCount}</Badge>)}
      <Icon f7="ellipsis_vertical" color="white " />
    </Block>
    <Img alt={user.name} slot="media" src={user.avatar} width="80" />
  </StyledListItem>
);

ConversationListItem.propTypes = {
  unreadCount: PropTypes.number.isRequired,
  isChannel: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default ConversationListItem;

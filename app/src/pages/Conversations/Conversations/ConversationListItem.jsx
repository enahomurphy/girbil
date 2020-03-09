import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Icon } from 'framework7-react';
import { Title, Text, Block } from '@/pages/style';
import { Img, StyledListItem } from './style';

const ConversationListItem = ({ unreadCount, user, id }) => (
  <StyledListItem
    link={`/conversations/${id}/`}
    title={(
      <Block margin>
        <Title margin="0 0 5px 0" align="left">{user.name}</Title>
        <Text margin="0" align="left">
          {
            unreadCount
              ? `${unreadCount} new ${unreadCount === 1 ? 'chat' : 'chats'}`
              : user.lastActive
          }
        </Text>
      </Block>
    )}
    after={(
      <Block padding="0">
        {unreadCount && (<Badge color="red">{unreadCount}</Badge>)}
        <Icon f7="ellipsis_vertical" color="white " />
      </Block>
    )}
  >
    <Img alt={user.name} slot="media" src={user.avatar} width="80" />
  </StyledListItem>
);

ConversationListItem.propTypes = {
  unreadCount: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default ConversationListItem;

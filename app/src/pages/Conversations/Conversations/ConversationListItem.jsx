import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ListItem, Badge, Icon } from 'framework7-react';
import { Title, Text, Block } from '@/pages/style';

const Img = styled.img`
  width: 64px;
  height: 80px;
  border-radius: 6px;
`;

const StyledListItem = styled(ListItem)`
  list-style-type: none;
  .item-link .item-inner {
    padding: 0 16px 0 0;

    &::before {
      display: none;   
    }
  }
`;

const ConversationListItem = ({ unreadCount, user }) => (
  <StyledListItem
    link="/conversations/1"
    title={(
      <Block>
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
};

export default ConversationListItem;

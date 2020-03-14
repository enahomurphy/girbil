
import React from 'react';
import PropTypes from 'prop-types';

import { Title, Text, Block } from '@/components/Style';
import { Lock } from '@/components/Icon';
import {
  Img, StyledListItem, Active, StyledTitle,
} from './style';
import ListInfo from './ListInfo';

const ListItem = ({
  unreadCount, user, isChannel, isPrivate, isActive, subText, getLink,
}) => (
  <Block
    margin="0"
    padding="0 24px"
    type="flex"
    align="center"
    justify="space-between"
  >
    <StyledListItem link={getLink(user)}>
      <Block margin>
        <Block
          type="flex"
          align="flex-end"
          weight="600"
          margin="0 0 5px 0"
        >
          { (isChannel && !isPrivate) && <Title margin="0" width="20px">#</Title> }
          {
            (isChannel && isPrivate) && (
              <span style={{ margin: '0 5px 1px 0' }}>
                <Lock />
              </span>
            )
          }
          <StyledTitle>{`${user.name}`}</StyledTitle>
          {
          !isChannel && (
            <Active
              active={isActive}
              width="8px"
              height="8px"
              style={{ alignSelf: 'center' }}
            />
          )
        }
        </Block>
        {
          subText ? (
            <Text margin="0" align="left">
              { subText }
            </Text>
          ) : null
        }
        <Text margin="0" align="left">
          { Boolean(unreadCount) && `${unreadCount} new ${unreadCount === 1 ? 'chat' : 'chats'}`}
          { Boolean(!unreadCount) && user.lastActive}
        </Text>
      </Block>
      <Img alt={user.name} slot="media" src={user.avatar} width="80" />
    </StyledListItem>
    <ListInfo unreadCount={unreadCount} />
  </Block>
);

ListItem.defaultProps = {
  unreadCount: 0,
  subText: '',
};

ListItem.propTypes = {
  unreadCount: PropTypes.number,
  subText: PropTypes.string,
  isChannel: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  getLink: PropTypes.func.isRequired,
};

export default ListItem;

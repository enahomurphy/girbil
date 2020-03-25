
import React from 'react';
import PropTypes from 'prop-types';

import {
  Title, Text, Block, ShortTitle,
} from '@/components/Style';
import { Lock } from '@/components/Icon';
import { Img, StyledListItem, Active } from './style';
import ListInfo from './ListInfo';

const ListItem = ({
  unreadCount, onClick, user, isChannel, isPrivate, isActive, subText, getLink, options, id,
}) => (
  <Block
    margin="0"
    padding="0 24px"
    type="flex"
    align="center"
    justify="space-between"
  >
    <StyledListItem link={getLink(user)} onClick={onClick}>
      <Block margin>
        <Block
          type="flex"
          align="flex-end"
          weight="600"
          margin="0 0 5px 0"
        >
          { (isChannel && !isPrivate) && <Title margin="0">#</Title> }
          {
            (isChannel && isPrivate) && (
              <span style={{ margin: '0 5px 1px 0' }}>
                <Lock />
              </span>
            )
          }
          <ShortTitle
            margin="0 9px 0 2px"
          >
            {`${user.name}`}
          </ShortTitle>
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
          { Boolean(!isChannel && unreadCount) && `${unreadCount} new ${unreadCount === 1 ? 'chat' : 'chats'}`}
          { Boolean(!isChannel && !unreadCount) && user.lastActive}
          { Boolean(isChannel) && `${user.members} members`}
        </Text>
      </Block>
      <Img alt={user.name} slot="media" src={user.avatar} width="80" />
    </StyledListItem>
    <ListInfo id={id} options={options} unreadCount={unreadCount} />
  </Block>
);

ListItem.defaultProps = {
  unreadCount: 0,
  subText: '',
  options: [],
};

ListItem.propTypes = {
  unreadCount: PropTypes.number,
  id: PropTypes.string.isRequired,
  subText: PropTypes.string,
  isChannel: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  getLink: PropTypes.func.isRequired,
  options: PropTypes.array,
};

export default ListItem;

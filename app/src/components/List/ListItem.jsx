import React from 'react';
import PropTypes from 'prop-types';

import {
  Title, Text, Block, ShortTitle, ListBlock,
} from '@/components/Style';
import { Lock } from '@/components/Icon';
import { SimpleProfileImage } from '@/components/ProfileImage';
import { StyledListItem, Active } from './style';
import ListInfo from './ListInfo';

const ListItem = ({
  unreadCount, onClick, user, isChannel, isPrivate, subText, getLink, options, id,
}) => (
  <ListBlock
    margin="0 10px"
    padding="8px 3px 8px 8px"
    type="flex"
    align="center"
    justify="space-between"
    className="list-item"
  >
    <StyledListItem link={getLink(user)} onClick={onClick}>
      <div style={{ marginRight: '16px' }}>
        <SimpleProfileImage name={user.name} url={user.avatar} width="64px" height="80px" />
      </div>
      <Block>
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
              active={user.isActive}
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
    </StyledListItem>
    <ListInfo id={id} options={options} unreadCount={unreadCount} />
  </ListBlock>
);

ListItem.defaultProps = {
  unreadCount: 0,
  subText: '',
  options: [],
  onClick: () => {},
};

ListItem.propTypes = {
  unreadCount: PropTypes.number,
  id: PropTypes.string.isRequired,
  subText: PropTypes.string,
  isChannel: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  getLink: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  options: PropTypes.array,
};

export default ListItem;

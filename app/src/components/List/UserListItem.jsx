import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'framework7-react';

import { Block, Image } from '@/components/Style';
import { StyledUserListItem, Active, StyledTitle } from './style';

const UserListItem = ({
  user, link, isActive, checkbox, checked, onChange, style,
}) => (
  <Block
    margin="0"
    type="flex"
    align="center"
    justify="space-between"
    style={style}
  >
    <StyledUserListItem link={link}>
      <Image radius="2px" src={user.avatar} width="32px" height="40px" />
      <Block margin="0 0 0 16px">
        <Block
          type="flex"
          align="flex-end"
        >
          <StyledTitle>{`${user.name}`}</StyledTitle>
          <Active
            active={isActive}
            width="8px"
            height="8px"
            style={{ alignSelf: 'center' }}
          />
        </Block>
      </Block>
    </StyledUserListItem>
    {checkbox && <Checkbox onChange={() => onChange(user)} checked={checked} />}
  </Block>
);


UserListItem.defaultProps = {
  checkbox: false,
  checked: false,
  onChange: () => {},
  style: {},
};

UserListItem.propTypes = {
  link: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  checkbox: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

export default UserListItem;

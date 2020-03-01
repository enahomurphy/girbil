import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'framework7-react';
import { Title, Text } from '@/components/Style';
import { BackIcon, StyledHeader } from './style';

const Header = ({ back, onClick }) => (
  <StyledHeader>
    <BackIcon onClick={onClick}>
      <Icon f7={back ? 'arrow_left' : 'multiply'} />
    </BackIcon>
    <div>
      <Title margin="0 0 7px 0" size="24px" transform="lowercase">
        <Icon f7="lock_fill" />
        DEV
        <Icon f7="chevron_right" style={{ fontSize: '16px', marginLeft: '10px' }} />
      </Title>
      <Text color="var(--gb-medium-grey)">3 members</Text>
    </div>
  </StyledHeader>
);

Header.defaultProps = {
  back: false,
};


Header.propTypes = {
  back: PropTypes.bool,
  onClick: PropTypes.string.isRequired,
};

export default Header;

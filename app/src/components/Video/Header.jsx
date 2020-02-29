import React from 'react';
import { Icon } from 'framework7-react';
import { Title, Text } from '@/components/Style';
import { BackIcon, StyledHeader } from './style';

const Header = () => (
  <StyledHeader>
    <BackIcon>
      <Icon f7="arrow_left" />
    </BackIcon>
    <div>
      <Title margin="0 0 7px 0" size="24px" lower>
        #DEV
        <Icon f7="chevron_right" style={{ fontSize: '16px', marginLeft: '10px' }} />
      </Title>
      <Text color="#FFFFFF">Active 17h ago</Text>
    </div>
  </StyledHeader>
);

Header.propTypes = {

};

export default Header;

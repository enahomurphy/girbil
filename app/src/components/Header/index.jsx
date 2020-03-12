import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Navbar,
  NavLeft,
  NavRight,
  Link,
} from 'framework7-react';

import { Title } from '@/components/Style';
import { Back } from '@/components/Icon';

const StyledNavbar = styled(Navbar)`
  height: 87px;
`;

const Header = ({ title }) => (
  <StyledNavbar>
    <NavLeft>
      <Back />
      <Title
        margin="0 0 0 16px"
        size="24px"
        width="100%"
      >
        {title}
      </Title>
    </NavLeft>
    <NavRight>
      <Link icon="icon-bars" panelOpen="right" />
    </NavRight>
  </StyledNavbar>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

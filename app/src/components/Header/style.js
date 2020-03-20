import { Navbar } from 'framework7-react';

import styled from 'styled-components';

export const NavbarWrapper = styled.div`
  padding-top: 24px;
  -webkit-app-region: drag;

  .navbar-bg::after {
    border: none;
  }
`;

export const StyledNavbar = styled(Navbar)`
  height: 80px;
  border-bottom: 1px solid #ffffff;
  -webkit-app-region: drag;
`;
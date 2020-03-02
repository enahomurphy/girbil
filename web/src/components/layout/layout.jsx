import React from 'react';

import { MainContainer, LayoutContainer } from './style';

const Layout = ({ children }) => (
  <LayoutContainer>
    <MainContainer>
      {children}
    </MainContainer>
  </LayoutContainer>
);

export default Layout;

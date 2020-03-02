import React from 'react';
import PropTypes from 'prop-types';

import { MainContainer, LayoutContainer } from './style';

const Layout = ({ children, height }) => (
  <LayoutContainer>
    <MainContainer height={height}>
      {children}
    </MainContainer>
  </LayoutContainer>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  height: PropTypes.string.isRequired,
};

export default Layout;

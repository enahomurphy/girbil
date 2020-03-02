import React from 'react';
import PropTypes from 'prop-types';
import { Title } from '@/components/styles';

import { MainContainer, LayoutContainer } from './style';

const Layout = ({ children, height, title }) => (
  <LayoutContainer>
    <MainContainer height={height}>
      <Title width="312px">{title}</Title>
      {children}
    </MainContainer>
  </LayoutContainer>
);

Layout.defaultProps = {
  height: '650px',
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  height: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Layout;

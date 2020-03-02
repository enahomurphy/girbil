import React from 'react';
import PropTypes from 'prop-types';

import Layout from '@/components/layout';
import { Title, Text } from './style';

const AuthLayout = ({ children, height, title }) => (
  <Layout height={height}>
    <Title>{title}</Title>
    {children}
  </Layout>
);

AuthLayout.defaultProps = {
  height: '650px',
};

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
  height: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default AuthLayout;

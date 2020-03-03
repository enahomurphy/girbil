import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Title } from '@/components/styles';
import Loader from '@shared/components/icons/Loader';

import { MainContainer, LayoutContainer, LoadingOverlay } from './style';

const Layout = ({
  children, height, title, loading,
}) => (
  <LayoutContainer>
    <MainContainer loading={loading.toString()} height={height}>
      {
        loading && (
          <LoadingOverlay>
            <Loader />
          </LoadingOverlay>
        )
      }
      <Fragment>
        <Title width="312px">{title}</Title>
        {children}
      </Fragment>
    </MainContainer>
  </LayoutContainer>
);

Layout.defaultProps = {
  height: '650px',
  loading: false,
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  height: PropTypes.string,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default Layout;

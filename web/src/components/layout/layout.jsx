import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Title } from '@/components/styles';
import Loader from '@shared/components/icons/Loader';

import Back from '@/components/icons/Back';
import { Flex, Button } from '@/components/Styles';
import { MainContainer, LayoutContainer, LoadingOverlay } from './style';

const Layout = ({
  children, height, title, loading, nav, padding, buttonText, buttonAction, backAction,
}) => (
  <LayoutContainer>
    {nav}
    <MainContainer
      padding={padding || '56px 48px 20px 48px'}
      loading={loading.toString()}
      height={height}
    >
      {
        loading && (
          <LoadingOverlay>
            <Loader />
          </LoadingOverlay>
        )
      }
      <Fragment>
        <Flex>
          {
            backAction && (
            <div className="layout-back-icon" role="presentation" onClick={backAction}>
              <Back />
            </div>
            )
          }
          <Title width="312px">{title}</Title>
          {Boolean(buttonText) && (
          <Button
            className="green layout-button"
            width="126px"
            height="24px"
            onClick={buttonAction}
          >
            {buttonText}
          </Button>
          )}
        </Flex>
        {children}
      </Fragment>
    </MainContainer>
  </LayoutContainer>
);

Layout.defaultProps = {
  height: '650px',
  loading: false,
  nav: null,
  padding: '56px 48px 20px 48px',
  buttonText: '',
  buttonAction: () => {},
  backAction: null,
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  height: PropTypes.string,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  nav: PropTypes.element,
  padding: PropTypes.string,
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func,
  backAction: PropTypes.oneOfType([PropTypes.func, () => null]),
};

export default Layout;

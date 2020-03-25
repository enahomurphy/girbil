import React, { Fragment } from 'react';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';

import GoogleIcon from '@/components/icons/Google';
import Layout from '@/components/layout';
import { Text } from '@/components/styles';
import { DividerContainer, Footer, GoogleButton } from '../style';

const Home = ({ onLoginSuccess, onLoginError, loading }) => (
  <Layout loading={loading} title="Let’s get started!">
    <Fragment>
      <Text margin="16px 0 0 0">
        First, create your user Girbil account.
        This account can be used across multiple organizations.
      </Text>
      <Text
        size="18px"
        color="#ffffff"
        margin="40px 0 32px 0"
        weight="600"
      >
        Use an authentication service
      </Text>

      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        render={renderProps => (
          <GoogleButton
            className="primary"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <span>
              <GoogleIcon />
            </span>
            Continue with Google
          </GoogleButton>
        )}
        buttonText="Login"
        onSuccess={onLoginSuccess}
        onFailure={onLoginError}
        cookiePolicy="single_host_origin"
      />
      <DividerContainer>
        <div className="divider" />
        <div className="or">
          <Text size="18px" color="#ffffff">OR</Text>
        </div>
        <div className="divider" />
      </DividerContainer>
      <Text size="18px" color="#ffffff" margin="40px 0 24px 0">
        Continue using your email address
      </Text>
      <Text size="14px" color="var(--gb-web-blue)" margin="0 0 24px 0">
        Coming soon!
      </Text>
      <Footer>
        <Text size="14px" align="center">
          Girbil is made with
          <span role="img" aria-label="love">❤️</span>
          around the world by a remote team.
        </Text>
      </Footer>
    </Fragment>
  </Layout>
);

Home.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
  onLoginError: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Home;

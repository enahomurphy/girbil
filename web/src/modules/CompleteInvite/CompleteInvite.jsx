import React, { Fragment } from 'react';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';

import GoogleIcon from '@/components/icons/Google';
import Layout from '@/components/layout';
import { Text } from '@/components/styles';
import { Footer, GoogleButton } from '../style';

const CompleteInvite = ({
  title, onLoginSuccess, onLoginError, loading,
}) => (
  <Layout loading={loading} title={title}>
    <Fragment>
      <Text margin="16px 0 0 0">
        Start connecting and collaborating with your team in a more productive and human way.
      </Text>
      <Text
        size="18px"
        color="#ffffff"
        margin="40px 0 32px 0"
        weight="400"
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
      <Footer bottom="90px">
        <button
          onClick={() => {}}
          className="transparent"
          type="button"
        >
          CLOSE BROWSER TAB
        </button>
      </Footer>
    </Fragment>
  </Layout>
);

CompleteInvite.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
  onLoginError: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default CompleteInvite;

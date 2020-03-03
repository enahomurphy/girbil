import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { mutation } from '@shared/graphql/auth';
import Auth from './Auth';

const Home = () => {
  const [loginUser, { loading }] = useMutation(mutation.SOCIAL_LOGIN);
  const history = useHistory();
  const { addToast } = useToasts();

  const alert = () => {
    addToast('Unable to sign you in, try again or contact admin@girbil.com', {
      appearance: 'error',
    });
  };

  const handleLogin = async ({ accessToken }) => {
    try {
      const { data } = await loginUser({
        variables: {
          accessToken,
          type: 'google',
        },
      });

      localStorage.setItem('gb-token', data.social.token);
      history.push('/signup/1');
    } catch (_) {
      alert();
    }
  };

  const handleLoginError = () => alert();

  return (
    <Auth
      onLoginSuccess={handleLogin}
      onLoginError={handleLoginError}
      loading={loading}
    />
  );
};

export default Home;

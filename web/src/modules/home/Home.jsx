import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { mutation } from '@shared/graphql/auth';
import { query } from '@shared/graphql/organizations';
import { storage } from '@shared/lib';
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
      const { data: { social: { token, organizations } } } = await loginUser({
        variables: { accessToken, type: 'google' },
        update: (store, { data: { social } }) => {
          const data = store.readQuery({ query: query.ORGANIZATIONS });

          data.organizations.push(...social.organizations);
          store.writeQuery({
            query: query.ORGANIZATIONS,
            data,
          });
        },
      });

      storage.setToken(token);

      if (organizations.length) {
        return history.push('/organizations');
      }

      return history.push('/signup/1');
    } catch (_) {
      return alert();
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

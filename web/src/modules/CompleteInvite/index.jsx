import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { mutation, query } from '@shared/graphql/auth';
import { storage, get } from '@shared/lib';
import CompleteInvite from './CompleteInvite';

function useQueryParams() {
  const result = {};
  new URLSearchParams(useLocation().search).forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

const Invite = () => {
  const history = useHistory();
  const { inviteId, emailToken } = useQueryParams();
  const [loginUser, { loading }] = useMutation(mutation.SOCIAL_LOGIN);
  const { data, error } = useQuery(
    query.INVITE_URL_ORGANIZATION,
    { variables: { inviteId, emailToken } },
  );
  const { addToast } = useToasts();

  const { name } = get(data, 'inviteUrlOrganization', { name: '', id: '' });

  const alert = () => {
    addToast('Unable to sign you in, try again or contact admin@girbil.com', {
      appearance: 'error',
    });
  };

  const handleLogin = async ({ accessToken }) => {
    try {
      const { data: { social: { token } } } = await loginUser({
        variables: {
          accessToken, type: 'google', inviteId, emailToken,
        },
        update: () => {

        },
      });

      storage.setToken(token);

      return history.push('/download');
    } catch (_) {
      return alert();
    }
  };

  const handleLoginError = () => alert();

  if (error) {
    return <Redirect to="/not-found" />;
  }

  return (
    <CompleteInvite
      onLoginSuccess={handleLogin}
      onLoginError={handleLoginError}
      loading={Boolean(loading)}
      title={`Join ${name} on Girbil`}
    />
  );
};

export default Invite;

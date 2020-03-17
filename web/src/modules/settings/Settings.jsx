import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { storage, get } from '@shared/lib';
import { query } from '@shared/graphql/organizations';
import SettingsNav from './SettingsNav';
import Routes from './Routes';

function useToken() {
  return (new URLSearchParams(useLocation().search)).get('token');
}

const Settings = () => {
  const token = useToken();
  const [getOrg, { loading }] = useLazyQuery(query.GET_ORGANIZATION);

  useEffect(() => {
    getOrg({
      variables: {
        organizationId: storage.payload.organization.id,
      },
    });
  }, [getOrg]);

  if (token) {
    storage.setToken(token);
  } else if (!storage.token && !get(storage.payload, 'organization.id', null)) {
    storage.clear();
    return <Redirect to="/" />;
  }

  if (
    storage.payload
    && ['user', 'admin'].includes(get(storage.payload, 'organization.role'))
  ) {
    return <Redirect to="/not-found" />;
  }

  if (loading) {
    return null;
  }

  return (
    <>
      <SettingsNav />
      <Routes />
    </>
  );
};

Settings.propTypes = {

};

export default Settings;

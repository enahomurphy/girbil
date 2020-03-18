import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { storage } from '@shared/lib';
import { query } from '@shared/graphql/organizations';
import SettingsNav from './SettingsNav';
import Routes from './Routes';

const Settings = () => {
  const [getOrg, { loading }] = useLazyQuery(query.GET_ORGANIZATION);

  useEffect(() => {
    getOrg({
      variables: {
        organizationId: storage.payload.organization.id,
      },
    });
  }, [getOrg]);

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

import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { storage, get } from '@shared/lib';

function useToken() {
  return (
    new URLSearchParams(useLocation().search)).get('token') || storage.token;
}

const OrgRoute = (props) => {
  const token = useToken();
  if (token) {
    storage.setToken(token);
  } else if (!storage.token && !get(storage.payload, 'organization.id', null)) {
    storage.clear();
    return <Redirect to="/" />;
  }

  if (
    !get(storage.payload, 'organization.role', null)
   || (
     storage.payload
    && ['user', 'admin'].includes(get(storage.payload, 'organization.role'))
   )
  ) {
    return <Redirect to="/not-found" />;
  }

  return (
    <Route {...props} />
  );
};


export default OrgRoute;

import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { storage } from '@shared/lib';

const Authenticated = (props) => {
  const { push } = useHistory();
  const user = storage.payload;
  const { path } = props;

  if (!user) {
    return <Redirect path="/signup" />;
  }

  if (user && path === '/signup') {
    push('/organizations');
    return null;
  }

  return (
    <Route user={user} {...props} />
  );
};

Authenticated.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Authenticated;

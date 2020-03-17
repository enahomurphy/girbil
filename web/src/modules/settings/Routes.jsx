import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

import OrgSetting from './pages/Organization';
// import OrgDomain from './pages/Organization/EditURL';
import AccountManagement from './pages/Management';
import Permission from './pages/Permissions';
import Billing from './pages/Billing';

const SettingsRoute = () => {
  const match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route
          exact
          path={match.url}
          component={OrgSetting}
        />
        <Route
          path={`${match.url}/management`}
          component={AccountManagement}
        />
        <Route
          path={`${match.url}/organization`}
          component={OrgSetting}
        />
        <Route
          path={`${match.url}/users/permissions`}
          component={Permission}
        />
        <Route
          path={`${match.url}/billing`}
          component={Billing}
        />
        <Route
          path={`${match.url}/*`}
          component={AccountManagement}
        />
      </Switch>
    </>
  );
};

export default SettingsRoute;

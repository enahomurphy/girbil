import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ToastProvider } from 'react-toast-notifications';

import { storage } from '@shared/lib';
import ApolloClient from '@shared/graphql/client';
import Header from './modules/header';
import Home from './modules/home/Home';
import Share from './modules/share';
import Download from './modules/Download';
import NotFound from './modules/NotFound';
import Organizations, { Create } from './modules/organizations';
import Invite from './modules/invite';
import CompleteInvite from './modules/CompleteInvite';
import Settings from './modules/settings';

import { Authenticated, OrgRoute } from './components/protected';

const client = ApolloClient({
  errorHandler: ({ networkError }) => {
    if (networkError) {
      if (networkError.statusCode === 401) {
        storage.clear();
        window.location.href = '/';
      }
    }
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <ToastProvider
      autoDismiss
      autoDismissTimeout={3000}
      placement="bottom-left"
    >
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/signup" />} />
          <Route exact path="/download" component={Download} />
          <Route exact path="/invite/accept" component={CompleteInvite} />
          <Authenticated exact path="/signup" component={Home} />
          <Authenticated exact path="/organizations" component={Organizations} />
          <Authenticated exact path="/organizations/create" component={Create} />
          <Route exact path="/invite" component={Invite} />
          <OrgRoute exact path="/share" component={Share} />
          <OrgRoute path="/settings" component={Settings} />
          <Route
            path="*"
            component={NotFound}
          />
        </Switch>
      </Router>
    </ToastProvider>
  </ApolloProvider>
);

export default App;

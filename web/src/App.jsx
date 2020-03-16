import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ToastProvider } from 'react-toast-notifications';

import client from '@shared/graphql/client';
import Header from './components/header';
import Home from './modules/home/Home';
import Share from './modules/share';
import Download from './modules/Download';
import NotFound from './modules/NotFound';
import Organizations, { Create } from './modules/organizations';
import Invite from './modules/invite';

import { Authenticated } from './components/protected';

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
          <Authenticated exact path="/signup" component={Home} />
          <Route exact path="/share" component={Share} />
          <Route exact path="/download" component={Download} />
          <Authenticated exact path="/organizations" component={Organizations} />
          <Authenticated exact path="/organizations/create" component={Create} />
          <Authenticated exact path="/organizations/invite" component={Invite} />
          <Route exact path="*" component={NotFound} />
          <Route path="/user/invite">
            <div>Invite user</div>
          </Route>
        </Switch>
      </Router>
    </ToastProvider>
  </ApolloProvider>
);

export default App;

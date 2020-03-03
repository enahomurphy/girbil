import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastProvider } from 'react-toast-notifications';

import client from '@shared/graphql/client';
import Header from './components/header';
import Home from './modules/home/Home';
import Share from './pages/Share';
import Download from './pages/Download';
import NotFound from './pages/NotFound';
import Organizations, { Create } from './modules/organizations';

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
          <Authenticated exact path="/organizations/create" render={() => <Redirect to="/organization/create/1" />} />
          <Authenticated exact path="/organization/create/:step" component={() => <Create />} />
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

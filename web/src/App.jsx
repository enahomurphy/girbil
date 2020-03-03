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
import Signup from './modules/Signup';
import Share from './pages/Share';
import Download from './pages/Download';
import NotFound from './pages/NotFound';
import Organizations from './pages/Organizations';

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
          <Route exact path="/signup" component={Home} />
          <Route exact path="/signup/:step" component={() => <Signup />} />
          <Route exact path="/share" component={Share} />
          <Route exact path="/download" component={Download} />
          <Route exact path="/organizations" component={Organizations} />
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

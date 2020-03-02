import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/header';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/signup" />} />
      <Route exact path="/signup" component={Home} />
      <Route path="/user/invite">
        <div>Invite user</div>
      </Route>
    </Switch>
  </Router>
);

export default App;

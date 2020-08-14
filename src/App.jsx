import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Timeline from './timeline/main';
import Login from './login/Login';
import Signup from './login/Signup';

const Switcher = () => (
  <>
    <Switch>
      <Route exact path="/timeline" component={Timeline} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  </>
);

const App = () => (
  <Router>
    <Switcher />
  </Router>
);

export default App;

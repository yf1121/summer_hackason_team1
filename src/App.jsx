import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Timeline from './timeline/main';
import Login from './login/Login';
import Signup from './login/Signup';
import Logout from './login/Logout';

const Switcher = () => (
  <>
    <Switch>
      <Route exact path="/timeline" component={Timeline} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/logout" component={Logout} />
    </Switch>
  </>
);

const App = () => (
  <Router>
    <Switcher />
  </Router>
);

export default App;

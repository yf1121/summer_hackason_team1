import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Timeline from './timeline/main';

const Switcher = () => (
  <>
    <Switch>
      <Route exact path="/timeline" component={Timeline} />
    </Switch>
  </>
);

const App = () => (
  <Router>
    <Switcher />
  </Router>
);

export default App;

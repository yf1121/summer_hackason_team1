import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import NavigationBar from './utils/Navigationbar';
import Timeline from './timeline/main';
import Home from './home/main';
import Footer from './utils/Footer';

const Switcher = () => (
  <>
    <Switch>
      <Route exact path="/(.+)" component={NavigationBar} />
    </Switch>
    <Switch>
      <Route exact path="/timeline" component={Timeline} />
      <Route exact path="/" component={Home} />
    </Switch>
    <Switch>
      <Route exact path="/(.+)" component={Footer} />
    </Switch>
  </>
);

const App = () => (
  <Router>
    <Switcher />
  </Router>
);

export default App;

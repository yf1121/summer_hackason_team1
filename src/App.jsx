import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import NavigationBar from './utils/Navigationbar';
import Footer from './utils/Footer';
import Auth from './utils/Auth';
import Home from './home/main';
import Timeline from './timeline/main';
import Login from './login/Login';
import Signup from './login/Signup';
import Logout from './login/Logout';
import Post from './post/main';
import Detail from './detail/Detail';
import Search from './search/Search';
import Setting from './setting/main';
import User from './user/main';

const Switcher = () => (
  <>
    <Switch>
      <Route exact path="/(.+)" component={NavigationBar} />
    </Switch>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/timeline" component={Timeline} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/post/:postid" component={Detail} />
      <Route exact path="/user/:userid" component={User} />
      <Route exact path="/search/:stype/:tag" component={Search} />
      <Route exact path="/search/:stype" component={Search} />
      <Route exact path="/search" component={Search} />
      {/* Auth以下は認証が必要なページ */}
      <Auth>
        <Route exact path="/logout" key="logout" component={Logout} />
        <Route exact path="/post" key="post" component={Post} />
        <Route exact path="/setting" key="setting" component={Setting} />
      </Auth>
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

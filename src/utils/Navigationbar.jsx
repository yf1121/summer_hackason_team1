import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Typekit from 'react-typekit';
import AuthToggle from './AuthToggle';
import MyPage from './nav/MyPage';
import style from './Navigation.module.css';

const Login = () => (
  <Link to="/login">ログイン</Link>
);

const NavigationBar = () => (
  <Navbar className={style.header}>
    <Navbar.Brand href="/timeline" className={style.title}>Newstater</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text className={style.login}>
        <AuthToggle>
          <span loading="true">
            Loading...
          </span>
          <Login loggedIn={false} />
          <MyPage loggedIn />
        </AuthToggle>
        <Link to="/search">
          <Button style={{ margin: '0px 10px' }} variant="secondary">検索</Button>
        </Link>
      </Navbar.Text>
    </Navbar.Collapse>
    <Typekit kitId={process.env.REACT_APP_ADOBE_TYPEKIT_ID} />
  </Navbar>
);

export default NavigationBar;

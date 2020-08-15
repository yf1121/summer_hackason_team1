import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthToggle from './AuthToggle';
import MyPage from './nav/MyPage';
import style from './Navigation.module.css';

const Login = () => (
  <Link to="/login">ログイン</Link>
);

const NavigationBar = () => (
  <Navbar className={style.header}>
    <Navbar.Brand href="/timeline">新聞記事感想投稿</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text className={style.login}>
        <AuthToggle>
          <span loading>
            Loading...
          </span>
          <Login loggedIn={false} />
          <MyPage loggedIn />
        </AuthToggle>
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;

import React from 'react';
import { Navbar } from 'react-bootstrap';
import style from './Navigation.module.css';

const NavigationBar = () => (
  <Navbar className={style.header}>
    <Navbar.Brand href="/timeline">新聞記事感想投稿</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text className={style.login}>
        <a href="/login">ログイン / サインアップ</a>
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;

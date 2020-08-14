import React from 'react';
import { Navbars } from 'react-bootstrap';

const NavigationBar = () => (
  <Navbars>
    <Navbars.Brand href="/">新聞記事感想投稿</Navbars.Brand>
    <Navbars.Toggle />
    <Navbars.Collapse className="justify-content-end">
      <Navbars.Text>
        <a href="/login">ログイン</a>
        <a href="/signup">サインアップ</a>
      </Navbars.Text>
    </Navbars.Collapse>
  </Navbars>
);

export default NavigationBar;

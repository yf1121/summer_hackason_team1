import React from 'react';
import style from './home.module.css';

const Home = () => (
  <div className={style.homediv}>
    <h1 className={style.hometitle}>NEWS</h1>
    <h2 className={style.homedetail}>新聞の感想を投稿する全く新しいアプリ</h2>
    <h3><a href="/timeline" className={style.linklearge}>みんなの投稿を見る</a></h3>
    <p>
      <a href="/login" className={style.link}>login</a>
    </p>
  </div>
);

export default Home;

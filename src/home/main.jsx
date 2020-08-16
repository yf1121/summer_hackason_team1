import React from 'react';
import Typekit from 'react-typekit';
import style from './home.module.css';

const Home = () => (
  <div className={style.homediv}>
    <h1 className={style.hometitle}>Newstater</h1>
    <h2 className={style.homedetail}>新聞の感想を投稿する全く新しいアプリ</h2>
    <h3><a href="/timeline" className={style.linklearge}>みんなの投稿を見る</a></h3>
    <p>
      <a href="/login" className={style.link}>login</a>
    </p>
    <Typekit kitId={process.env.REACT_APP_ADOBE_TYPEKIT_ID} />
  </div>
);

export default Home;

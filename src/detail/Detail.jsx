import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import style from './PostDetail.module.css';
import { getPostDetail } from '../utils/firebase/main';

const formatDate = (date, _format) => {
  let format = _format || 'YYYY-MM-DD hh:mm:ss.SSS';
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, (`0${date.getMonth() + 1}`).slice(-2));
  format = format.replace(/dd/g, (`0${date.getDate()}`).slice(-2));
  format = format.replace(/HH/g, (`0${date.getHours()}`).slice(-2));
  format = format.replace(/mm/g, (`0${date.getMinutes()}`).slice(-2));
  format = format.replace(/ss/g, (`0${date.getSeconds()}`).slice(-2));
  return format;
};

export default class Detail extends React.Component {
  constructor(props) {
    super();
    this.id = props.match.params.postid;
    // propsから値取り出し
    this.state = {
      posts: null,
    };
  }

  componentDidMount() {
    const { id } = this;
    getPostDetail(id).then((posts) => {
      this.setState({ posts });
    });
  }

  render() {
    const { posts } = this.state;
    if (!posts) {
      return 'loading';
    }
    const newsDayFormatted = formatDate(posts.newsday.toDate(), 'yyyy年MM月dd日');
    const createdDayFormatted = formatDate(posts.createdAt.toDate(), 'が  yyyy年MM月dd日 HH時mm分に投稿');
    return (
      <div className={style.body}>
        <Card className={style.card}>
          <Card.Body className={style.cardbody}>
            <h2 className={style.title}>{posts.title}</h2>
            <div className={style.meta}>
              <h3 className={style.gray}>{posts.newspaper}</h3>
              <h3 className={style.gray}>{newsDayFormatted}</h3>
            </div>
            <p className={style.meta}>
              <span className={style.username}>{posts.user.name}</span>
              <span className={style.gray}>{createdDayFormatted}</span>
            </p>
            <p className={style.main}>{posts.content}</p>
          </Card.Body>
        </Card>
        <a href="/timeline" className={style.link}>一覧に戻る</a>
      </div>
    );
  }
}

Detail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postid: PropTypes.string,
    }),
  }).isRequired,
};

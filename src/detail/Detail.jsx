import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import style from './PostDetail.module.css';
import { getPostDetail } from '../utils/firebase/main';

export default class Detail extends React.Component {
  constructor(props) {
    super();
    this.id = props.match.params.postid;
    // propsから値取り出し
    this.state = {
      posts: [],
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
    return (
      <div className={style.body}>
        <Card className={style.card}>
          <Card.Body className={style.cardbody}>
            <h2 className={style.title}>{posts.title}</h2>
            <h3 className={style.gray}>{posts.newspaper}</h3>
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

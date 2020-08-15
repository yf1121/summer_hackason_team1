/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  Card,
  Badge,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './Post.module.css';

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

const Post = ({
  post,
}) => {
  const {
    title, newspaper, newsday, createdAt, content, user, userid, id, tag,
  } = post;
  const newsDayFormatted = formatDate(newsday.toDate(), 'yyyy年MM月dd日');
  const createdDayFormatted = formatDate(createdAt.toDate(), 'MM/dd HH:mm');
  return (
    <Card className={style.card}>
      <Card.Body className={style.card_inner}>
        <div className={style.newspaper_title}>
          {`${newspaper} : ${newsDayFormatted}`}
        </div>
        <Card.Title className={style.title}><Link to={`/post/${id}`} className={style.link}>{title}</Link></Card.Title>
        <Badge variant="primary">{tag}</Badge>
        <div className={style.username}>
          <Link to={`/user/${userid}`} className={style.link}>{user.name}</Link>
        </div>
        <Card.Text>
          {content.length > 50 ? `${content.slice(0, 50)}...` : content}
        </Card.Text>
        <div className={style.created_at}>
          {createdDayFormatted}
        </div>
      </Card.Body>
    </Card>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    newspaper: PropTypes.string,
    tag: PropTypes.string,
    newsday: PropTypes.object,
    createdAt: PropTypes.object,
    content: PropTypes.string,
    userid: PropTypes.string,
    id: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

Post.defaultProps = {
  post: {
    title: '',
    newspaper: '',
    newsday: {},
    createdAt: {},
    content: '',
    userid: '',
    id: '',
    user: {
      name: '',
    },
  },
};
export default Post;

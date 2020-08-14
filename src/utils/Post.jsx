import React from 'react';
import {
  Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

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
  title,
  newspaper,
  newsday,
  createdAt,
  content,
  user,
}) => {
  const newsDayFormatted = formatDate(new Date(newsday), 'yyyy年MM月dd日');
  const createdDayFormatted = formatDate(new Date(createdAt), 'MM/dd HH:mm');
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <div>
          {`${newspaper} : ${newsDayFormatted}`}
        </div>
        <div>
          {user.name}
        </div>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {content}
        </Card.Text>
        <div>
          {createdDayFormatted}
        </div>
      </Card.Body>
    </Card>
  );
};

Post.propTypes = {
  title: PropTypes.string,
  newspaper: PropTypes.string,
  newsday: PropTypes.string,
  createdAt: PropTypes.string,
  content: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Post.defaultProps = {
  title: '',
  newspaper: '',
  newsday: '',
  createdAt: '',
  content: '',
  user: {
    name: '',
  },
};
export default Post;

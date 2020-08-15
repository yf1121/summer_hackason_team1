import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getUser, getUserPosts } from '../utils/firebase/main';
import Post from '../utils/Post';
import style from './UserPage.module.css';

const UserDetail = ({ user }) => {
  const { name } = user;
  return <div>{name}</div>;
};
UserDetail.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const PostsList = ({ posts }) => posts.map((post) => (<Post key={post.id} post={post} />));
PostsList.propTypes = {
  posts: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    userid: PropTypes.string.isRequired,
    newspaper: PropTypes.string.isRequired,
    createdAt: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    newsDay: PropTypes.object.isRequired,
    tag: PropTypes.string,
  }).isRequired,
};

export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      posts: [],
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { userid } = this.props.match.params;
    getUser(userid).then((user) => {
      this.setState({ user });
    });
    getUserPosts(userid).then((posts) => {
      this.setState({ posts });
    });
  }

  render() {
    const { user, posts } = this.state;
    if (!user) return 'Loading...';
    return (
      <div className={`${style.body} maincontents`}>
        <Row>
          <Col sm={3} className={style.username}>
            <div className={style.profile}>
              <UserDetail user={user} />
              <div className={style.circle}>
                <h4 className={style.rep}>感想数</h4>
                <postNum className={style.postnum}>{posts.length}</postNum>
              </div>
            </div>
          </Col>
          <Col sm={9} className={style.card}>
            <p className={style.title}>My Post</p>
            <PostsList posts={posts} />
          </Col>
        </Row>
      </div>
    );
  }
}

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getUser, getUserPosts } from '../utils/firebase/main';
import Post from '../utils/Post';

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
      <Row>
        <Col sm={3}><UserDetail user={user} /></Col>
        <Col sm={9} style={{ padding: '0px 5px' }}><PostsList posts={posts} /></Col>
      </Row>
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

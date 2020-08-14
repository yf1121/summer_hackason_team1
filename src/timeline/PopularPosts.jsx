import React from 'react';
import { getPopularPosts } from '../utils/firebase/main';
import Post from '../utils/Post';

export default class PopularPosts extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    getPopularPosts(10).then((posts) => {
      this.setState({ posts });
    });
  }

  render() {
    const { posts } = this.state;
    return (
      <>
        {
          posts.map((post) => (<Post key={post.id} post={post} />))
        }
      </>
    );
  }
}

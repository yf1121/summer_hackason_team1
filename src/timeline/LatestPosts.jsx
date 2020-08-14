import React from 'react';
import { getLatestPosts } from '../utils/firebase/main';

export default class LatestPosts extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    getLatestPosts.then((posts) => {
      this.setState({ posts });
    });
  }

  render() {
    return (
      <>
        
      </>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { searchTagPosts } from '../utils/firebase/main';
import TagMenu from '../post/TagMenu';
import Post from '../utils/Post';
import { tags } from '../utils/tags';
import style from './Search.module.scss';

export default class TagSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      tag: '',
      loading: false,
    };
  }

  componentDidMount() {
    const { tag } = this.props;
    if (tags.indexOf(tag) >= 0) {
      this.setState({
        tag,
      });
      this.execSearch(tag);
    }
  }

  execSearch(tag) {
    this.setState({
      tag,
      loading: true,
    });
    searchTagPosts(tag).then((posts) => {
      this.setState({
        posts,
        loading: false,
      });
    });
  }

  render() {
    const { posts, tag, loading } = this.state;
    // eslint-disable-next-line no-nested-ternary
    const message = loading ? 'Loading...' : (tag ? `${posts.length}個` : '');
    return (
      <div>
        <div className={style.base}>
          <h3>タグ検索</h3>
          <TagMenu title="Tag" tags={tags} value={tag} onChange={(_tag) => this.execSearch(_tag)} />
        </div>
        <div>
          { message }
        </div>
        {
          posts.map((post) => <Post key={post.id} post={post} />)
        }
      </div>
    );
  }
}

TagSearch.propTypes = {
  tag: PropTypes.string,
};
TagSearch.defaultProps = {
  tag: '',
};

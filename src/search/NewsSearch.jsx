import React from 'react';
import PropTypes from 'prop-types';
import { searchNewsPosts } from '../utils/firebase/main';
import TagMenu from '../post/TagMenu';
import Post from '../utils/Post';
import { newspapers } from '../utils/tags';
import style from './Search.module.scss';

export default class NewsSearch extends React.Component {
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
    if (newspapers.indexOf(tag) >= 0) {
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
    searchNewsPosts(tag).then((posts) => {
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
          <h3>新聞検索</h3>
          <TagMenu title="Newspaper" tags={newspapers} value={tag} onChange={(_tag) => this.execSearch(_tag)} />
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

NewsSearch.propTypes = {
  tag: PropTypes.string,
};
NewsSearch.defaultProps = {
  tag: '',
};

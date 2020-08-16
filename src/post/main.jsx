import React from 'react';
import {
  Form,
  Button,
  Alert,
  Card,
} from 'react-bootstrap';
import { firebase, createPost, getCurrentUser } from '../utils/firebase/main';
import style from './Post.module.css';

import TagMenu from './TagMenu';
import { tags, newspapers } from '../utils/tags';

export default class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      newspaper: '',
      tag: '',
      content: '',
      newsday: '',
      isPost: false,
      isEmpty: false,
    };
  }

  onChange(e, tag) {
    const newState = {};
    newState[tag] = e.target.value;
    this.setState(newState);
  }

  onChangeTag(tagName, tag) {
    const newState = {};
    newState[tagName] = tag;
    this.setState(newState);
  }

  async onClick(e) {
    e.preventDefault();
    const {
      title, content, newsday, newspaper, tag,
    } = this.state;
    const postdata = {
      userid: (await getCurrentUser()).userid,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      newsday: firebase.firestore.Timestamp.fromDate(new Date(newsday)),
      fav: 0,
      title,
      newspaper,
      tag,
      content,
    };
    if (title === '' || content === '' || newsday === '' || newspaper === '' || tag === '') {
      this.setState({ isEmpty: true });
    } else {
      createPost(postdata);
      this.setState({ isPost: true });
      this.setState({ isEmpty: false });
    }
  }

  render() {
    const {
      title, content, newsday, isPost, newspaper, tag, isEmpty,
    } = this.state;
    return (
      <div className={`${style.wrapper} maincontents`}>
        <Card className={style.card}>
          <h3>投稿</h3>
          {isPost ? <Alert variant="primary">Posted</Alert> : ''}
          {isEmpty ? <Alert variant="danger">すべての項目を入力してください。</Alert> : ''}
          <Form>
            <TagMenu tags={newspapers} value={newspaper} title="Newspaper" onChange={(_tag) => this.onChangeTag('newspaper', _tag)} />
            {isEmpty && newspaper === '' ? <Alert variant="danger">掲載紙を選択してください。</Alert> : ''}
            <Form.Group controlId="postNewsday">
              <Form.Label>NewsDate</Form.Label>
              <Form.Control type="date" value={newsday} onChange={(e) => this.onChange(e, 'newsday')} />
              {isEmpty && newsday === '' ? <Alert variant="danger">掲載年月日を選択してください。</Alert> : ''}
            </Form.Group>
            <TagMenu tags={tags} value={tag} title="Tag" onChange={(_tag) => this.onChangeTag('tag', _tag)} />
            {isEmpty && tag === '' ? <Alert variant="danger">タグを選択してください。</Alert> : ''}
            <Form.Group controlId="postTitle">
              <Form.Label>Post Title</Form.Label>
              <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => this.onChange(e, 'title')} />
              {isEmpty && title === '' ? <Alert variant="danger">タイトルを入力してください。</Alert> : ''}
            </Form.Group>
            <Form.Group controlId="postContent">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" placeholder="Content" value={content} onChange={(e) => this.onChange(e, 'content')} style={{ height: '15rem' }} />
              {isEmpty && content === '' ? <Alert variant="danger">感想を入力してください。</Alert> : ''}
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => this.onClick(e)} disabled={isPost}>
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

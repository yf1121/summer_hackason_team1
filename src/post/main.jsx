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
    createPost(postdata);
    this.setState({ isPost: true });
  }

  render() {
    const {
      title, content, newsday, isPost, newspaper, tag,
    } = this.state;
    return (
      <div className={`${style.wrapper} maincontents`}>
        <Card className={style.card}>
          {isPost ? <Alert variant="primary">Posted</Alert> : ''}
          <Form>
            <TagMenu tags={newspapers} value={newspaper} title="Newspaper" onChange={(_tag) => this.onChangeTag('newspaper', _tag)} />
            <Form.Group controlId="postNewsday">
              <Form.Label>NewsDate</Form.Label>
              <Form.Control type="date" value={newsday} onChange={(e) => this.onChange(e, 'newsday')} />
            </Form.Group>
            <TagMenu tags={tags} value={tag} title="Tag" onChange={(_tag) => this.onChangeTag('tag', _tag)} />
            <Form.Group controlId="postTitle">
              <Form.Label>Post Title</Form.Label>
              <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => this.onChange(e, 'title')} />
            </Form.Group>
            <Form.Group controlId="postContent">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" placeholder="Content" value={content} onChange={(e) => this.onChange(e, 'content')} />
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

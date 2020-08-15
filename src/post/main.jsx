import React from 'react';
import {
  Container,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import { firebase, createPost, getCurrentUser } from '../utils/firebase/main';

export default class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      newspaper: '',
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

  async onClick(e) {
    e.preventDefault();
    const {
      title, newspaper, content, newsday,
    } = this.state;
    const postdata = {
      userid: (await getCurrentUser()).userid,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      newsday: firebase.firestore.Timestamp.fromDate(new Date(newsday)),
      fav: 0,
      title,
      newspaper,
      content,
    };
    createPost(postdata);
    this.setState({ isPost: true });
  }

  render() {
    const {
      title, newspaper, content, newsday, isPost,
    } = this.state;
    return (
      <Container>
        {isPost ? <Alert variant="primary">Posted</Alert> : ''}
        <Form>
          <Form.Group controlId="postNewspaper">
            <Form.Label>Newspaper</Form.Label>
            <Form.Control type="text" placeholder="Newspaper" value={newspaper} onChange={(e) => this.onChange(e, 'newspaper')} />
          </Form.Group>
          <Form.Group controlId="postNewsday">
            <Form.Label>NewsDate</Form.Label>
            <Form.Control type="date" value={newsday} onChange={(e) => this.onChange(e, 'newsday')} />
          </Form.Group>
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
      </Container>
    );
  }
}

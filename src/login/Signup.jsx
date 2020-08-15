import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { firebaseAuth, setUser, getUserFromUid } from '../utils/firebase/main';

export default class Signup extends React.Component {
  constructor() {
    super();
    this.mounted = false;
    const { currentUser } = firebaseAuth;
    this.state = {
      isSignedUp: currentUser,
      isLoggedIn: false,
      username: '',
    };
    this.username = '';
  }

  componentDidMount() {
    this.mounted = true;

    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        this.setState({
          isSignedUp: true,
          isLoggedIn: !!await getUserFromUid(user.uid),
        });
      } else {
        this.setState({
          isSignedUp: false,
          isLoggedIn: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onChange(e) {
    this.setState({ username: e.target.value });
  }

  onClick() {
    const { username } = this.state;
    const { currentUser } = firebaseAuth;
    setUser({
      name: username,
      uid: currentUser.uid,
    });
    this.setState({ isLoggedIn: true });
  }

  render() {
    const { isLoggedIn, isSignedUp } = this.state;
    if (!isSignedUp) {
      return <Redirect to="/login" />;
    }
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
    const { username } = this.state;
    return (
      <Container>
        <Form.Control
          type="text"
          value={username}
          palceholder="username"
          onChange={(e) => this.onChange(e)}
        />
        <Button variant="primary" onClick={() => this.onClick()}>Submit</Button>
      </Container>
    );
  }
}

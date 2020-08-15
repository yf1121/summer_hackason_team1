import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { firebase, firebaseAuth, getUserFromUid } from '../utils/firebase/main';

const loginHandler = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebaseAuth.signInWithRedirect(provider);
};

export default class Login extends React.Component {
  constructor() {
    super();
    this.mounted = false;
    const { currentUser } = firebaseAuth;
    this.state = {
      isSignedUp: currentUser,
      isLoggedIn: false,
    };
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
        this.setState({ isSignedUp: false, isLoggedIn: false });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { isLoggedIn, isSignedUp } = this.state;
    if (isSignedUp) {
      if (isLoggedIn) {
        return <Redirect to="/timeline" />;
      }
      return <Redirect to="/signup" />;
    }
    return (
      <Container>
        <Button variant="primary" size="lg" active onClick={loginHandler}>
          Google Login
        </Button>
      </Container>
    );
  }
}

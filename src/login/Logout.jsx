import React from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { firebaseAuth } from '../utils/firebase/main';

export default class Logout extends React.Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  logout() {
    firebaseAuth.signOut().catch(() => {
      this.setState({
        hasError: true,
      });
    });
  }

  render() {
    const { hasError } = this.state;
    return (
      <Container>
        {hasError ? (<Alert variant="danger">Error!</Alert>) : false}
        <Button variant="primary" size="lg" active onClick={() => this.logout()}>
          Logout
        </Button>
      </Container>
    );
  }
}

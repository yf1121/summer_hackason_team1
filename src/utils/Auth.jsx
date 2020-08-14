import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firebaseAuth } from './firebase/main';

export default class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      signinChecked: false,
      isSignedIn: false,
    };

    this.isMounted = false;
  }

  componentDidMount() {
    this.isMounted = true;

    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        if (this.isMounted) {
          this.setState({
            signinChecked: true,
            isSignedIn: true,
          });
        }
      } else if (this.isMounted) {
        this.setState({
          signinChecked: true,
          isSignedIn: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const { signinChecked, isSignedIn } = this.state;
    if (!signinChecked) {
      return (
        <>
          Loading...
        </>
      );
    }
    if (isSignedIn) {
      const { children } = this.props;
      return children;
    }
    return <Redirect to="/signin" />;
  }
}

Auth.propTypes = {
  children: PropTypes.element.isRequired,
};

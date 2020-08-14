import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firebaseAuth, getUserFromUid } from './firebase/main';

export default class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      signinChecked: false,
      isLoggedIn: false,
    };

    this.isMounted = false;
  }

  componentDidMount() {
    this.isMounted = true;

    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        if (this.isMounted) {
          this.setState({
            signinChecked: true,
            isLoggedIn: !!await getUserFromUid(user.uid),
          });
        }
      } else if (this.isMounted) {
        this.setState({
          signinChecked: true,
          isLoggedIn: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const { signinChecked, isLoggedIn } = this.state;
    if (!signinChecked) {
      return (
        <>
          Loading...
        </>
      );
    }
    if (isLoggedIn) {
      const { children } = this.props;
      return children;
    }
    return <Redirect to="/signin" />;
  }
}

Auth.propTypes = {
  children: PropTypes.element.isRequired,
};

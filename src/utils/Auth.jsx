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

    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;

    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        if (this.mounted) {
          this.setState({
            signinChecked: true,
            isLoggedIn: !!await getUserFromUid(user.uid),
          });
        }
      } else if (this.mounted) {
        this.setState({
          signinChecked: true,
          isLoggedIn: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
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
    return <Redirect to="/login" />;
  }
}

Auth.propTypes = {
  children: PropTypes.element.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { firebaseAuth, getUserFromUid } from './firebase/main';

/*
AuthToggle使い方
<AuthToggle>
  <SomeComponent loading />
  <SomeComponent loggedIn/>
  <SomeComponent loggedIn={false} />
  <SomeComponent loggedIn={false} loading
</AuthToggle>
*/

export default class AuthToggle extends React.Component {
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
    const { children } = this.props;

    const result = children.map((child) => {
      if (child.props) {
        if (!signinChecked) {
          if (child.props.loading) return child;
        } else if (
          child.props.loggedIn !== undefined && child.props.loggedIn === isLoggedIn
        ) return child;
      }
      return '';
    });
    return result;
  }
}

AuthToggle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

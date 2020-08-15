/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { firebase, firebaseAuth, getUserFromUid } from '../utils/firebase/main';
import style from './account.module.scss';

// eslint-disable-next-line react/prop-types
const LoginText = ({ children }) => (
  <div className={`${style.wrapper} maincontents`}>
    <div className={style.float_box}>
      <h3 className={style.info}>Googleアカウントでログイン</h3>
      {children}
    </div>
  </div>
);

export default class Login extends React.Component {
  constructor() {
    super();
    this.mounted = false;
    const { currentUser } = firebaseAuth;
    this.state = {
      isSignedUp: currentUser,
      isLoggedIn: false,
      isChecking: false,
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

  loginHandler() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth.signInWithPopup(provider);
    this.setState({
      isChecking: true,
    });
  }

  render() {
    const { isLoggedIn, isSignedUp, isChecking } = this.state;
    if (isSignedUp) {
      if (isLoggedIn) {
        return <Redirect to="/timeline" />;
      }
      return <Redirect to="/signup" />;
    }
    return (
      <LoginText>
        {
          isChecking ? <div>Checking...</div> : <input className={style.google_signin_button} type="button" onClick={() => this.loginHandler()} />
        }
      </LoginText>
    );
  }
}

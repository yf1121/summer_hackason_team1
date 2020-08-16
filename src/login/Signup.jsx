/* eslint-disable no-irregular-whitespace */
import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  InputGroup, Form, Button, Alert,
} from 'react-bootstrap';
import { firebaseAuth, setUser, getUserFromUid } from '../utils/firebase/main';
import style from './account.module.scss';
import { validateUsername } from '../utils/validation';

// eslint-disable-next-line react/prop-types
const SignupText = ({ children }) => (
  <div className={`${style.wrapper} maincontents`}>
    <div className={style.float_box}>
      <div>あなたはまだ表示名を登録していません！</div>
      <h3 className={style.info}>表示名を登録</h3>
      <div>空白文字を除き3文字以上</div>
      {children}
    </div>
  </div>
);
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
      return <Redirect to="/timeline" />;
    }
    const { username } = this.state;
    const isValid = validateUsername(username);
    return (
      <SignupText>
        {isValid ? '' : <Alert variant="danger">不正な表示名です</Alert>}
        <InputGroup>
          <Form.Control
            type="text"
            value={username}
            palceholder="username"
            onChange={(e) => this.onChange(e)}
          />
          <InputGroup.Append>
            <Button variant="primary" onClick={() => this.onClick()} disabled={!isValid}>Submit</Button>
          </InputGroup.Append>
        </InputGroup>
      </SignupText>
    );
  }
}

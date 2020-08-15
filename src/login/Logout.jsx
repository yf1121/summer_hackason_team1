import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import { firebaseAuth } from '../utils/firebase/main';
import style from './account.module.scss';

// eslint-disable-next-line react/prop-types
const LogoutText = ({ children }) => (
  <div className={`${style.wrapper} maincontents`}>
    <div className={style.float_box}>
      {children}
    </div>
  </div>
);

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
      <LogoutText>
        {hasError ? (<Alert variant="danger">Error!</Alert>) : false}
        <Button variant="primary" size="lg" active onClick={() => this.logout()}>
          ログアウト
        </Button>
      </LogoutText>
    );
  }
}

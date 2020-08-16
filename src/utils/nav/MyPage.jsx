import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getCurrentUser } from '../firebase/main';

export default class MyPage extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    getCurrentUser().then((user) => {
      this.setState({
        user,
      });
    });
  }

  render() {
    const { user } = this.state;
    if (!user) return <></>;
    const { name } = user;
    return (
      <>
        <Link to="setting">{name}</Link>
        /
        <Link to="/logout">ログアウト</Link>
        <Link to="/post">
          <Button style={{ margin: '0px 10px' }} variant="primary">投稿</Button>
        </Link>
      </>
    );
  }
}

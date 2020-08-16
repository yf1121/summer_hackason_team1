import React from 'react';
import {
  Card, Form, Button, Alert, InputGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from './Setting.module.css';
import { getCurrentUser, updateUser } from '../utils/firebase/main';
import { validateUsername } from '../utils/validation';

export default class Setting extends React.Component {
  constructor() {
    super();
    this.state = {
      userid: '',
      name: '',
      uid: '',
      isChanged: false,
    };
  }

  componentDidMount() {
    getCurrentUser().then((user) => {
      this.setState(user);
    });
  }

  onChange(tag, value) {
    const newdata = {};
    newdata[tag] = value;
    this.setState(newdata);
  }

  changeUserdata(e) {
    e.preventDefault();
    const { userid, name } = this.state;

    updateUser(userid, {
      name,
    }).then(() => {
      this.setState({
        isChanged: true,
      });
    });
  }

  render() {
    const {
      userid, name, uid, isChanged,
    } = this.state;
    const validation = validateUsername(name);
    return (
      <div className={`${style.wrapper} maincontents`}>
        <Card className={style.card}>
          <div className={style.section_box}>
            <h3>マイページ</h3>
            <Link to={`/user/${userid}`}>
              <Button variant="primary" type="submit">
                マイページ
              </Button>
            </Link>
          </div>
          <div className={style.section_box}>
            <h3>設定</h3>
            {isChanged ? <Alert variant="primary">Changed</Alert> : ''}
            <Form>
              <Form.Group controlId="userid">
                <Form.Label>UserID(変更不可)</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                      /users/
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="text" value={userid} readOnly />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="uid">
                <Form.Label>UID(変更不可)</Form.Label>
                <Form.Control type="text" value={uid} readOnly />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>表示名</Form.Label>
                <Form.Control type="text" placeholder="Username" value={name} onChange={(e) => this.onChange('name', e.target.value)} disabled={isChanged} />
                <Form.Text className="text-muted">
                  空白文字を除き3文字以上
                </Form.Text>
                {validation ? '' : <Alert variant="danger">不正な表示名です。</Alert>}
              </Form.Group>
              <Button variant="primary" type="submit" onClick={(e) => this.changeUserdata(e)} disabled={isChanged || !validation}>
                Submit
              </Button>
            </Form>
          </div>

        </Card>
      </div>
    );
  }
}

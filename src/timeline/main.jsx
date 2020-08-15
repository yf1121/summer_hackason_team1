import React from 'react';
// import { Header, Footer } from './utils/'
import {
  Tabs,
  Tab,
  Container,
} from 'react-bootstrap';
import LatestPosts from './LatestPosts';
import PopularPosts from './PopularPosts';
import style from './Timeline.module.scss';

class Feed extends React.Component {
  constructor() {
    super();
    this.state = {
      key: 'Recent',
    };
  }

  render() {
    const { key } = this.state;
    return (
      <Tabs
        id="timeline-tab"
        activeKey={key}
        onSelect={(k) => this.setState({ key: k })}
      >
        <Tab eventKey="Recent" title="Recent" className={style.wrapper}>
          <h2>最新の投稿</h2>
          <LatestPosts />
        </Tab>
        <Tab eventKey="Popular" title="Popular" className={style.wrapper}>
          <h2>人気の投稿</h2>
          <PopularPosts />
        </Tab>
      </Tabs>
    );
  }
}

export default () => (
  <>
    <Container className="maincontents">
      <Feed />
    </Container>
  </>
);

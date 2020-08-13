import React from 'react';
import {
  Tabs,
  Tab,
} from 'react-bootstrap';
import LatestPosts from './LatestPosts';
import PopularPosts from './PopularPosts';

export default class Timeline extends React.Component {
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
        <Tab eventKey="Recent" title="Recent">
          <LatestPosts />
        </Tab>
        <Tab eventKey="Popular" title="Popular">
          <PopularPosts />
        </Tab>
      </Tabs>
    );
  }
}

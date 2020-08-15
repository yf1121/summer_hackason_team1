/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import { Header, Footer } from './utils/'
import {
  Tabs,
  Tab,
  Container,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import TagSearch from './TagSearch';
import NewsSearch from './NewsSearch';
import style from './Search.module.scss';

const searchType = {
  tag: 'Tag',
  newspaper: 'Newspaper',
};

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    const { stype } = props.match.params;
    this.state = {
      key: searchType[stype] || 'Tag',
    };
  }

  render() {
    const { key } = this.state;
    const { tag } = this.props.match.params;
    return (
      <Container className="maincontents">
        <Tabs
          id="timeline-tab"
          activeKey={key}
          onSelect={(k) => this.setState({ key: k })}
        >
          <Tab key="tag" eventKey="Tag" title="Tag" className={style.wrapper}>
            <TagSearch tag={tag} />
          </Tab>
          <Tab key="newspaper" eventKey="Newspaper" title="Newspaper" className={style.wrapper}>
            <NewsSearch tag={tag} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

Search.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      stype: PropTypes.string,
      tag: PropTypes.string,
    }),
  }),
};
Search.defaultProps = {
  match: {
    params: {
      stype: '',
      tag: '',
    },
  },
};

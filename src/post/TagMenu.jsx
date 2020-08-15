import React from 'react';
import {
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class TagMenu extends React.Component {
  setValue(value) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onChange(value);
  }

  render() {
    const { tags, title, value } = this.props;
    const tagComponent = tags.map((tag) => (
      <Dropdown.Item eventKey={tag} onClick={() => this.setValue(tag)}>{tag}</Dropdown.Item>
    ));
    return (
      <DropdownButton
        key={title}
        variant="primary"
        title={value || title}
      >
        {tagComponent}
      </DropdownButton>
    );
  }
}

TagMenu.propTypes = {
  value: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

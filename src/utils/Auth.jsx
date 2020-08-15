import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthToggle from './AuthToggle';

const Auth = (props) => {
  const { children } = props;
  const newChildren = React.cloneElement(<>{children}</>, { loggedIn: true });
  return (
    <AuthToggle>
      <div loading="true">
        Loading...
      </div>
      { newChildren }
      <Redirect loggedIn={false} to="/login" />
    </AuthToggle>
  );
};
Auth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Auth;

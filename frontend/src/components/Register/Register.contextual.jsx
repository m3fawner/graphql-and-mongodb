import React from 'react';
import { UserContext } from '../../api/user';
import Register from './Register';

export default (props) => (
  <UserContext.Consumer>
    {({
      error, isLoggedIn, loading, registerUser, fieldErrors,
    }) => React.createElement(Register, {
      error, isLoggedIn, loading, registerUser, fieldErrors, ...props,
    })}
  </UserContext.Consumer>
);

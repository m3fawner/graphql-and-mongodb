import React from 'react';
import { UserContext } from '../../api/user';
import Login from './Login';

export default (props) => (
  <UserContext.Consumer>
    {(value) => <Login {...value} {...props} />}
  </UserContext.Consumer>
);
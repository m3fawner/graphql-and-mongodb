import React from 'react';
import { UserContext } from '../../api/user';
import Login from './Login';

export default () => (
  <UserContext.Consumer>{(value) => <Login {...value} />}</UserContext.Consumer>
);

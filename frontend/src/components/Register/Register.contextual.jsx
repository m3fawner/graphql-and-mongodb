import React from 'react';
import { UserContext } from '../../api/user';
import Register from './Register';

export default (props) => (
  <UserContext.Consumer>
    {(value) => <Register {...value} {...props} />}
  </UserContext.Consumer>
);

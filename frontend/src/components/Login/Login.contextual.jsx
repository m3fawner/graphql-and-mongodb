import React from 'react';
import { UserContext } from '../../api/user';
import Login from './Login';

export default (props) => (
  <UserContext.Consumer>
    {({
      error, isLoggedIn, loading, login, onNewUserClick,
    }) => React.createElement(Login, {
      error, isLoggedIn, loading, login, onNewUserClick, ...props,
    })}
  </UserContext.Consumer>
);

import React from 'react';
import { UserContext } from '../../api/user';
import Header from './Header';

export default (props) => (
  <UserContext.Consumer>
    {({
      isLoggedIn, logOut,
    }) => React.createElement(Header, {
      isLoggedIn, logOut, ...props,
    })}
  </UserContext.Consumer>
);

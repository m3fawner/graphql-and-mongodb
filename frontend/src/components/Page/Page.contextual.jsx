import React from 'react';
import { UserContext } from '../../api/user';
import Page from './Page';

export default (props) => (
  <UserContext.Consumer>
    {({ isExpired }) => React.createElement(Page, { isExpired, ...props })}
  </UserContext.Consumer>
);

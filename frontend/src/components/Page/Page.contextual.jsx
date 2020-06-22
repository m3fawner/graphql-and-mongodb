import React from 'react';
import { UserContext } from '../../api/user';
import Page from './Page';

export default (props) => (
  <UserContext.Consumer>
    {(userContext) => React.createElement(Page, { ...userContext, ...props })}
  </UserContext.Consumer>
);

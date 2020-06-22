import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useUserReducer, { UserContext } from '../../api/user';
import Page from '../Page/Page.contextual';

export default () => {
  const userReducer = useUserReducer();
  return (
    <UserContext.Provider value={userReducer}>
      <Page>
        <div>Hello</div>
      </Page>
    </UserContext.Provider>
  );
};

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useUserReducer, { UserContext } from '../../api/user';
import Login from '../Login/Login';

export default () => {
  const userReducer = useUserReducer();
  const { isLoggedIn, decoded } = userReducer.state;
  return (
    <UserContext.Provider value={userReducer}>
      {isLoggedIn ? <div>Hello, {decoded.meta.name.first}</div> : <Login />}
    </UserContext.Provider>
  );
};

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import useUserReducer, { UserContext } from '../../api/user';
import Login from '../Login/Login';

export default () => {
  const userReducer = useUserReducer();
  const { isLoggedIn, isExpired, decoded } = userReducer.state;
  return (
    <UserContext.Provider value={userReducer}>
      {isExpired && (
        <Alert variant="warning">
          Your session has expired. Please login again.
        </Alert>
      )}
      {isLoggedIn ? <div>Hello, {decoded.meta.name.first}</div> : <Login />}
    </UserContext.Provider>
  );
};

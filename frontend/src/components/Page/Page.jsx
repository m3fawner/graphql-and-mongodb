import React from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Header from './Header.contextual';

export default ({ children, isExpired }) => (
  <div className="c-page">
    <Header />
    {isExpired && (
      <Alert variant="warning">
        Your session has expired. Please login again.
      </Alert>
    )}
    <Container className="c-page-content">{children}</Container>
  </div>
);

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Login from '../Login/Login.contextual';

export default ({ children, isExpired, isLoggedIn, logOut }) => {
  const [showLoginModal, setShowLogin] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      setShowLogin(false);
    }
  }, [isLoggedIn]);
  return (
    <>
      <div className="c-page">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Evan&apos;s Test</Navbar.Brand>
          <Nav />
          <Nav>
            {isLoggedIn ? (
              <Nav.Link onClick={logOut}>Log Out</Nav.Link>
            ) : (
              <Nav.Link onClick={() => setShowLogin(true)}>Log In</Nav.Link>
            )}
          </Nav>
        </Navbar>
        {isExpired && (
          <Alert variant="warning">
            Your session has expired. Please login again.
          </Alert>
        )}
        <Container className="c-page-content">{children}</Container>
      </div>
      <Modal show={showLoginModal} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
        </Modal.Body>
      </Modal>
    </>
  );
};

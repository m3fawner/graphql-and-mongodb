import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Alert from 'react-bootstrap/Alert';
import Login from '../Login/Login.contextual';
import Register from '../Register/Register.contextual';

export default ({ isLoggedIn, logOut }) => {
  const [showLoginModal, setShowLogin] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      setShowLogin(false);
    }
  }, [isLoggedIn]);
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Evan&apos;s Test</Navbar.Brand>
          <Nav className="ml-auto">
            {isLoggedIn ? (
              <Nav.Link
                onClick={() => {
                  setShowLogoutToast(true);
                  logOut();
                }}
              >
                Log Out
              </Nav.Link>
            ) : <Nav.Link onClick={() => setShowLogin(true)}>Log In</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
      <Modal show={showLoginModal} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showRegister ? (
            <Register />
          ) : <Login onNewUserClick={() => setShowRegister(true)} />}
        </Modal.Body>
      </Modal>
      <Toast
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        autohide
        delay={3000}
        onClose={() => setShowLogoutToast(false)}
        show={showLogoutToast}
      >
        <Alert variant="info">Signed out successfully!</Alert>
      </Toast>
    </>
  );
};

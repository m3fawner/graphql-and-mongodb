import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import loginSchema from '../../schemas/login';
import useForm from '../../form/form';
import Input from '../Input/Input';
import './login.css';

export default ({
  error, isLoggedIn, loading, login, onNewUserClick,
}) => {
  const { getInputProps, handleSubmit, canSubmit } = useForm({
    validationSchema: loginSchema,
    defaultValues: loginSchema.default(),
  });
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {!isLoggedIn && (
        <Form onSubmit={handleSubmit(login)} className="c-login">
          <Input {...getInputProps('username')}>Username</Input>
          <Input {...getInputProps('password')} type="password">
            Password
          </Input>
          <Container>
            <Row>
              <Col
                className="c-login-register"
                xs={{ order: 'last' }}
                md={{ order: 'first', span: 6 }}
              >
                <Button variant="link" onClick={onNewUserClick}>
                  New user?
                </Button>
              </Col>
              <Col md="6">
                <Button
                  type="submit"
                  variant="primary"
                  block
                  disabled={!canSubmit}
                >
                  {loading ? (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : 'Submit'}
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </>
  );
};

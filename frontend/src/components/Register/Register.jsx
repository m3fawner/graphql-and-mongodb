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

export default ({ error, isLoggedIn, loading, login }) => {
  const { getInputProps, handleSubmit } = useForm({
    validationSchema: loginSchema,
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
                <a>New user?</a>
              </Col>
              <Col md="6">
                <Button type="submit" variant="primary" block>
                  {loading ? (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </>
  );
};

import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import loginSchema from '../../schemas/login';
import useForm from '../../form/form';
import { UserContext } from '../../api/user';
import Input from '../Input/Input';

const Login = ({ state, login }) => {
  const { getInputProps, handleSubmit } = useForm({
    validationSchema: loginSchema,
  });
  return (
    <>
      {state.error && <Alert variant="danger">{state.error}</Alert>}
      {!state.isLoggedIn && (
        <Form onSubmit={handleSubmit(login)}>
          <Input {...getInputProps('username')}>Username</Input>
          <Input {...getInputProps('password')} type="password">
            Password
          </Input>
          <Button type="submit" variant="primary">
            {state.loading ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              'Submit'
            )}
          </Button>
        </Form>
      )}
    </>
  );
};

export default () => (
  <UserContext.Consumer>{(value) => <Login {...value} />}</UserContext.Consumer>
);

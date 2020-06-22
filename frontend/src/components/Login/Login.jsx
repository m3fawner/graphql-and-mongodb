import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
        <Form onSubmit={handleSubmit(login)}>
          <Input {...getInputProps('username')}>Username</Input>
          <Input {...getInputProps('password')} type="password">
            Password
          </Input>
          <Button type="submit" variant="primary">
            {loading ? (
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

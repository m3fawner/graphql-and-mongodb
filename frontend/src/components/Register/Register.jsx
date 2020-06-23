import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import registerSchema from '../../schemas/register';
import useForm from '../../form/form';
import Input from '../Input/Input';

export default ({
  error, isLoggedIn, loading, registerUser, fieldErrors,
}) => {
  const {
    getInputProps, handleSubmit, setError, canSubmit,
  } = useForm({
    validationSchema: registerSchema,
  });
  useEffect(() => {
    if (fieldErrors && Object.keys(fieldErrors)) {
      Object.entries(fieldErrors).forEach(([key, value]) => setError(key, {
        message: value,
      }));
    }
  }, [fieldErrors]);
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {!isLoggedIn && (
        <Form
          onSubmit={handleSubmit(({ confirmPassword, ...record }) => {
            registerUser(record);
          })}
          className="c-register"
        >
          <Input {...getInputProps('username')}>Username</Input>
          <Input {...getInputProps('password')} type="password">
            Password
          </Input>
          <Input {...getInputProps('confirmPassword')} type="password">
            Confirm password
          </Input>
          <Input {...getInputProps('email')} type="email">
            Email
          </Input>
          <Row>
            <Col md="6">
              <Input {...getInputProps('meta.name.first')}>First name</Input>
            </Col>
            <Col md="6">
              <Input {...getInputProps('meta.name.last')}>Last name</Input>
            </Col>
          </Row>
          <Button type="submit" variant="primary" block disabled={!canSubmit}>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : 'Submit'}
          </Button>
        </Form>
      )}
    </>
  );
};

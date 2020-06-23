import React from 'react';
import Form from 'react-bootstrap/Form';
import get from 'lodash/get';

const Input = ({
  name,
  children,
  errors,
  type,
  register,
  touched,
  ...props
}) => {
  const error = get(errors, name);
  return (
    <Form.Group controlId={name}>
      <Form.Label>{children}</Form.Label>
      <Form.Control
        type={type}
        ref={register}
        {...props}
        name={name}
        isValid={get(touched, name) && !error}
        isInvalid={error}
      />
      <Form.Control.Feedback type="invalid">
        {error && get(errors, name).message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
Input.defaultProps = {
  type: 'text',
};
export default Input;

import React from 'react';
import Form from 'react-bootstrap/Form';
import get from 'lodash/get';

const Input = ({ name, children, errors, type, register, ...props }) => (
  <Form.Group controlId={name}>
    <Form.Label>{children}</Form.Label>
    <Form.Control type={type} ref={register} {...props} name={name} />
    {get(name, errors) && (
      <Form.Control.Feedback type="invalid">
        Please choose a username.
      </Form.Control.Feedback>
    )}
  </Form.Group>
);
Input.defaultProps = {
  type: 'text',
};
export default Input;

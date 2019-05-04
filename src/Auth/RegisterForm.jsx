import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../common/Form/TextInput';

const RegisterForm = () => {
  return (
    <div>
      <Form size="large">
        <Segment>
          <Field
            name="userName"
            type="text"
            component={TextInput}
            placeholder="UserName"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          <Button fluid size="large" color="teal">
            Sign Up
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default reduxForm({form: 'register form'}) (RegisterForm);
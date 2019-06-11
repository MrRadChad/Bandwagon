import React from "react";
import { connect } from "react-redux";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { combineValidators, isRequired } from "revalidate";
import TextInput from "../common/Form/TextInput";
import { registerUser, socialLogin } from "./AuthActions";
import SocialLogin from './SocialLogins/SocialLogin'

const actions = {
  registerUser,
  socialLogin
};

const validate = combineValidators({
  userName: isRequired("Username"),
  email: isRequired("Email"),
  password: isRequired("Password")
});

const RegisterForm = ({
  handleSubmit,
  registerUser,
  error,
  invalid,
  submitting,
  socialLogin
}) => {
  return (
    <div>
      <Form size="large">
        <Segment>
          <Field
            name="userName"
            type="text"
            component={TextInput}
            placeholder="Username"
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
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Button
            disabled={invalid || submitting}
            fluid
            size="large"
            color="teal"
            onClick={handleSubmit(registerUser)}
          >
            Sign Up
          </Button>
          <Divider horizontal>Or</Divider>
          <SocialLogin socialLogin={socialLogin}/>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: "register form", validate })(RegisterForm));

import React from "react";
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../common/Form/TextInput";
import {
  combineValidators,
  matchesField,
  isRequired,
  composeValidators
} from "revalidate";

const validate = combineValidators({
  newPassword1: isRequired({ message: "Please enter a new Password" }),
  newPassword2: composeValidators(
    isRequired({ message: "Please confirm new Password" }),
    matchesField("newPassword1")({ message: "Passwords do not match" })
  )()
});

function AccountPage({
  error,
  invalid,
  submitting,
  handleSubmit,
  updatePassword,
  providerId
}) {
  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {providerId && providerId === "password" &&
        <div>
          <Header color="teal" sub content="Change password" />
          <p>Update Account Setings:</p>
          <Form onSubmit={handleSubmit(updatePassword)}>
            <Field
              width={8}
              name="newPassword1"
              type="password"
              pointing="left"
              inline={true}
              component={TextInput}
              basic={true}
              placeholder="New Password"
            />
            <Field
              width={8}
              name="newPassword2"
              type="password"
              inline={true}
              basic={true}
              pointing="left"
              component={TextInput}
              placeholder="Confirm Password"
            />
            {error && (
              <Label basic color="red">
                {error}
              </Label>
            )}
            <Divider />
            <Button
              disabled={invalid || submitting}
              size="large"
              positive
              content="Update Password"
            />
          </Form>
        </div>
      }

      {providerId && providerId === "facebook.com" && (
        <div>
          <Header color="teal" sub content="Facebook Account" />
          <p>Please visit Facebook to update your account settings</p>
          <Button type="button" color="facebook">
            <Icon name="facebook" />
            Go to Facebook
          </Button>
        </div>
      )}

      {providerId && providerId === "google.com" && (
        <div>
          <Header color="teal" sub content="Google Account" />
          <p>Please visit Google to update your account settings</p>
          <Button type="button" color="google">
            <Icon name="google" />
            Go to Google
          </Button>
        </div>
      )}
    </Segment>
  );
}

export default reduxForm({ form: "AccountPage", validate })(AccountPage);

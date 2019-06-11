import React from 'react';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import RadioInput from '../../../common/Form/RadioButton';
import TextInput from '../../../common/Form/TextInput';
import TextArea from '../../../common/Form/TextArea';
// import PlaceInput from '../../../common/Form/PlaceInput';
import SelectInput from '../../../common/Form/SelectInput';

const instruments = [
  { key: 'vocals', text: 'Vocals', value: 'vocals' },
  { key: 'rhythm_guitar', text: 'Rhythm Guitar', value: 'rhythm_guitar' },
  { key: 'lead_guitar', text: 'Lead Guitar', value: 'lead_guitar' },
  { key: 'bass', text: 'Bass', value: 'bass' },
  { key: 'drums', text: 'Drums', value: 'drums' },
  { key: 'piano', text: 'Piano', value: 'piano' },
];

const AboutPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
  return (
    <Segment>
      <Header dividing size="large" content="About Me" />
      <p>Complete your profile:</p>
      <Form onSubmit={handleSubmit(updateProfile)}>
        <Form.Group inline>
          <label>How serious are you about being a musician? </label>
          <Field 
            name="status" 
            component={RadioInput} 
            type="radio" 
            value="slightly" 
            label="Slightly" 
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="moderately"
            label="Moderately"
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="very"
            label="Very"
          />
        </Form.Group>
        <Divider />
        <label>Tell us about yourself</label>
        <Field name="about_me" component={TextArea} placeholder="About Me" />
        <Field
          name="instruments"
          component={SelectInput}
          options={instruments}
          value="instruments"
          multiple={true}
          placeholder="Select the instruments you play"
        />
        <Field
          width={8}
          name="occupation"
          type="text"
          component={TextInput}
          placeholder="Occupation"
        />
        <Field
          width={8}
          name="hometown"
          options={{ types: ['(regions)'] }}
          component={TextInput}
          placeholder="What city are you from?"
        />
        <Divider />
        <Button disabled={pristine || submitting} size="large" positive content="Update Profile" />
      </Form>
    </Segment>
  );
};

export default reduxForm({ form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false })(AboutPage);

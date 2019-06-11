import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button, Label} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import DateInput from "../../../common/Form/DateInput";
// import PlaceInput from '../../../common/Form/PlaceInput';
import TextInput from '../../../common/Form/TextInput';
import RadioButton from '../../../common/Form/RadioButton';
import {addDays} from 'date-fns'

class BasicPage extends Component {

    render() {
        const {pristine, submitting, handleSubmit, updateProfile} = this.props;
        return (
            <Segment>
                <Header dividing size='large' content='Basics' />
                <Form onSubmit={handleSubmit(updateProfile)}>
                    <Field
                        width={8}
                        name='displayName'
                        type='text'
                        component={TextInput}
                        placeholder='Known As'
                    />
                    <Form.Group inline>
                    <Label>Gender: </Label>
                      <Field 
                        name='gender'
                        type='radio'
                        value='male'
                        label='Male'
                        component={RadioButton}
                      />
                      <Field 
                        name='gender'
                        type='radio'
                        value='female'
                        label='Female'
                        component={RadioButton}
                      />
                    </Form.Group>
                    <Field
                        width={8}
                        name='dateOfBirth'
                        component={DateInput}
                        placeholder='Date of Birth'
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode='select'
                        maxDate={addDays(new Date(), 4680)}
                    />
                    <Field
                        name='city'
                        placeholder='Home Town'
                        options={{types: ['(cities)']}}
                        label='Female'
                        component={TextInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
                </Form>
            </Segment>
        );
    }
}

export default reduxForm({form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false })(BasicPage);

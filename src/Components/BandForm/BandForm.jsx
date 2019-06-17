import React, { Component } from "react";
import {
  Segment,
  Form,
  Button,
  Grid,
  Header,
  GridColumn
} from "semantic-ui-react";
import { connect } from "react-redux";
import { createBand, updateBand, disbandedToggle } from "../../bandList/bandActions";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../common/Form/TextInput";
import TextArea from "../../common/Form/TextArea";
import SelectInput from "../../common/Form/SelectInput";
import {
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { withFirestore } from "react-redux-firebase";
// import PlaceInput from "../../common/Form/PlaceInput";

const mapState = (state, ownProps) => {
  const bandId = ownProps.match.params.id;

  let band = {};

  if (state.firestore.ordered.Bands && state.firestore.ordered.Bands.length > 0) {
    band = state.firestore.ordered.Bands.filter(band => band.id === bandId)[0] || {};
  }

  return {
    initialValues: band,
    band
  };
};

const actions = {
  createBand,
  updateBand,
  disbandedToggle
};

const genre = [
  { key: "alternative", text: "Alternative", value: "Alternative" },
  { key: "americana", text: "Americana", value: "Americana" },
  { key: "blues", text: "Blues", value: "Blues" },
  { key: "coutry", text: "Coutry", value: "Coutry" },
  { key: "dance", text: "Dance", value: "Dance" },
  { key: "electronic", text: "Electronic", value: "Electronic" },
  { key: "hard-rock", text: "Hard-Rock", value: "Hard-Rock" },
  { key: "hip-hop", text: "Hip-Hop", value: "Hip-Hop" },
  { key: "indie", text: "Indie", value: "Indie" },
  { key: "jazz", text: "Jazz", value: "Jazz" },
  { key: "latin", text: "Latin", value: "Latin" },
  { key: "metal", text: "Metal", value: "Metal" },
  { key: "pop", text: "Pop", value: "Pop" },
  { key: "punk", text: "Punk", value: "Punk" },
  { key: "r&b", text: "R&B", value: "R&B" },
  { key: "reggae", text: "Reggae", value: "Reggae" },
  { key: "rock", text: "Rock", value: "Rock" },
  {
    key: "singer/songwriter",
    text: "Singer/Songwriter",
    value: "Singer/Songwriter"
  },
  { key: "ska", text: "Ska", value: "Ska" }
];

const validate = combineValidators({
  name: isRequired({ message: `Band Name is required` }),
  city: isRequired({ message: "Please provide your city" }),
  description: hasLengthGreaterThan(20)({
    message: "Bio needs to be at least 20 characters"
  }),
  genre: isRequired({ message: "Please select at least one genre" })
});

class BandForm extends Component {

  async componentDidMount () {
    const {firestore, match} =this.props;
    await firestore.setListener(`Bands/${match.params.id}`);
  }

  async componentWillUnmount () {
    const {firestore, match} =this.props;
    await firestore.unsetListener(`Bands/${match.params.id}`);
  }

  onFormSubmit = async values => {
    try {
      if (this.props.initialValues.id) {
        this.props.updateBand(values);
        this.props.history.push(`/band/${this.props.initialValues.id}`);
      } else {
        let createdBand = await this.props.createBand(values);
        this.props.history.push(`/band/${createdBand.id}`);
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  render() {
    const { invalid, submitting, pristine, band, disbandedToggle } = this.props;
    return (
      <Grid>
        <GridColumn width={10}>
          <Segment>
            <Header sub color="light blue" content="Band Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="name"
                type="text"
                component={TextInput}
                placeholder="Band Name"
              />
              <Field
                name="email"
                type="text"
                component={TextInput}
                placeholder="Band Email"
              />
              <Field
                name="city"
                type="text"
                component={TextInput}
                // options={{types: ['(cities)']}}
                placeholder="City"
              />
              <Field
                name="genre"
                component={SelectInput}
                options={genre}
                multiple={true}
                placeholder="Genre"
              />
              <Field
                name="description"
                type="text"
                rows={4}
                component={TextArea}
                placeholder="Bio"
              />
              <Field
                name="manager"
                type="text"
                component={TextInput}
                placeholder="Band Manager"
              />
              <Field
                name="imageURL"
                type="text"
                component={TextInput}
                placeholder="Image URL"
              />
              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
              <Button
              type='button'
              color={band.disbanded ? 'green' : 'red'}
              floated='right'
              content={band.disbanded ? 'Reunite' : 'Hiatus?'} 
              onClick={() => disbandedToggle(!band.disbanded, band.id)}
              />
            </Form>
          </Segment>
        </GridColumn>
      </Grid>
    );
  }
}

export default withFirestore(connect(
  mapState,
  actions
)(reduxForm({ form: "bandForm", enableReinitialize: true, validate })(BandForm)
));

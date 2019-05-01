import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import {connect} from 'react-redux'
import {createBand, updateBand} from '../../bandList/bandActions'
import cuid from 'cuid'

const mapState = (state, ownProps) => {
  const bandId = ownProps.match.params.id;

  let band = {
    name: "",
    email: "",
    genre: "",
    city: "",
    manager: "",
    description: "",
    imageURL: ""
  }

  if (bandId && state.bands.length > 0) {
    band = state.bands.filter(band => band.id === bandId)[0]
  }

  return {
    band
  }
}

const actions = {
  createBand,
  updateBand
}

class BandForm extends Component {
  state = {
    band: Object.assign({}, this.props.band)
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.band.id) {
      this.props.updateBand(this.state.band);
      this.props.history.goBack();
    } else {
      const newBand = {
        ...this.state.band,
        id: cuid(),
        bandPhotoURL: 'https://picsum.photos/225'
      };
      this.props.createBand(newBand)
      this.props.history.push('/bands')
    }
  };

  onInputChange = event => {
    const newBand = this.state.band;
    newBand[event.target.name] = event.target.value;
    this.setState({
      band: newBand
    });
    console.log(this.state);
  };

  render() {
    const { handleCancel } = this.props;
    const { band } = this.state;
    return (
      <div>
        <Segment>
          <Form>
            <Form.Field>
              <label>Band Name</label>
              <input
                name="name"
                placeholder="Band Name"
                onChange={this.onInputChange}
                value={band.name}
              />
            </Form.Field>
            <Form.Field>
              <label>Band Email</label>
              <input
                name="email"
                placeholder="Enter your band's email"
                onChange={this.onInputChange}
                value={band.email}
              />
            </Form.Field>
            <Form.Field>
              <label>Genre</label>
              <input
                name="genre"
                placeholder="Genre"
                onChange={this.onInputChange}
                value={band.genre}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                name="description"
                placeholder="Description"
                onChange={this.onInputChange}
                value={band.description}
              />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input
                name="city"
                placeholder="City your band is from"
                onChange={this.onInputChange}
                value={band.city}
              />
            </Form.Field>
            <Form.Field>
              <label>Managed By</label>
              <input
                name="manager"
                placeholder="Enter the name of your band manager"
                onChange={this.onInputChange}
                value={band.manager}
              />
            </Form.Field>
            <Form.Field>
              <label>Band Image</label>
              <input
                name="imageURL"
                placeholder="Image URL"
                onChange={this.onInputChange}
                value={band.bandimageURL}
              />
            </Form.Field>
            <Button positive type="submit" onClick={this.onFormSubmit}>
              Submit
            </Button>
            <Button onClick={this.props.history.goBack} type="button">
              Cancel
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default connect(mapState, actions) (BandForm);

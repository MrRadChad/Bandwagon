import React, { Component } from 'react'
import {Form, Label} from 'semantic-ui-react'
import Script from 'react-load-script'
import PlacesAutocomplete, {geocodeByAddress, geocodeByPlaceId, getLatLng} from 'react-places-autocomplete'

class PlaceInput extends Component {

    state = {
        address: '',
        scriptLoaded: false
    };

    handleChange = address => {
        this.setState({address})
    }

    handleSelect = address => {
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
    }

    handleScriptLoaded = () => this.setState({scriptLoaded: true});



  render() {
      const {input, onSelect, width, placeholder, options, meta: {touched, error}} = this.props;
    return (
      <Form.Field error={touched && !!error} width={width}>
          <Script 
            url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAY4ySXZKfUUOwQ9qpjzwatXHBWjSatdWI&libraries=places"
            onLoad={this.handleScriptLoaded}
          />
          {this.state.scriptLoaded &&
          <PlacesAutocomplete 
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={onSelect}
            options={options}
            getInputProps={{...input, placeholder}}
            />}
          {touched && error && <Label basic color='red'>{error}</Label>}
      </Form.Field>
    )
  }
}

export default PlaceInput




// import React, { Component } from "react";
// import { Form, Label } from "semantic-ui-react";
// import Script from "react-load-script";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng
// } from "react-places-autocomplete";

// const styles = {
//   autocompleteContainer: {
//     zIndex: 500
//   }
// };

// class PlaceInput extends Component {
//   state = {
//     scriptLoaded: false,
//     address: ""
//   };

//   handleScriptLoaded = () => this.setState({ scriptLoaded: true });

//   handleChange = address => {
//     this.setState({ address });
//   };

//   handleSelect = address => {
//     geocodeByAddress(address).then(results => getLatLng(results[0]));
//   };

//   render() {

//     const {
//       input,
//       width,
//       onSelect,
//       placeholder,
//       options,
//       meta: { touched, error }
//     } = this.props;
//     return (
//       <Form.Field error={touched && !!error} width={width}>
//         <Script
//           url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCF9Mq6ebdosG-h07k7nAceU4GfCyc_nk4&libraries=places"
//           onLoad={this.handleScriptLoaded}
//         />
//         {this.state.scriptLoaded && (
//           <PlacesAutocomplete
//             inputProps={{ ...input, placeholder }}
//             value={this.state.address}
//             onChange={this.handleChange}
//             options={options}
//             onSelect={onSelect}
//             styles={styles}
//           >
//           </PlacesAutocomplete>
//         )}
//         {touched && error && (
//           <Label basic color="red">
//             {error}
//           </Label>
//         )}
//       </Form.Field>
//     );
//   }
// }

// export default PlaceInput;

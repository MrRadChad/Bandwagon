import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

const emptyBand = {
  name: '',
  email: '',
  genre: '',
  city: '',
  manager: '',
  description: '',
  imageURL: ''
}

class BandForm extends Component {
  constructor(){
    super()

    this.state={
      band: emptyBand
    }
  }

  componentDidMount(){
    if(this.props.selectedBand !== null){
      this.setState({
        band: this.props.selectedBand
      })
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.selectedBand !== this.props.selectedBand){
      this.setState({
        band: nextProps.selectedBand || emptyBand
      })
    }
  }

  onInputChange=(event)=>{
    const newBand = this.state.band;
    newBand[event.target.name]=event.target.value
    this.setState({
      band : newBand
    })
    console.log(this.state)
  }

  onFormSubmit=(event)=>{
    event.preventDefault();
    if (this.state.band.id){
      this.props.updateBand(this.state.band);
    } else {
      this.props.addBand(this.state.band)
    }
  }

  render() {
    const {handleCancel} = this.props;
    const {band} = this.state;
    return (
      <div>
        <Segment>
          <Form>
            <Form.Field>
              <label>Band Name</label>
              <input name='name' placeholder="Band Name" onChange={this.onInputChange} value={band.name} />
            </Form.Field>
            <Form.Field>
              <label>Band Email</label>
              <input name='email' placeholder="Enter your band's email" onChange={this.onInputChange} value={band.email} />
            </Form.Field>
            <Form.Field>
              <label>Genre</label>
              <input name='genre' placeholder="Genre" onChange={this.onInputChange} value={band.genre} />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input name='description' placeholder="Description" onChange={this.onInputChange} value={band.description} />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input name='city' placeholder="City your band is from" onChange={this.onInputChange} value={band.city} />
            </Form.Field>
            <Form.Field>
              <label>Managed By</label>
              <input name='manager' placeholder="Enter the name of your band manager" onChange={this.onInputChange} value={band.manager} />
            </Form.Field>
            <Form.Field>
              <label>Band Image</label>
              <input name='imageURL' placeholder="Image URL" onChange={this.onInputChange} value={band.bandimageURL} />
            </Form.Field>
            <Button positive type="submit" onClick={this.onFormSubmit}>
              Submit
            </Button>
            <Button onClick={handleCancel}type="button">Cancel</Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default BandForm;

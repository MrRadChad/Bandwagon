import React, { Component } from 'react'
import { Grid, GridColumn, Button } from 'semantic-ui-react'
import BandList from '../Bands/BandList';
import BandForm from '../BandForm/BandForm';
import cuid from 'cuid'


const bands = [
  {
    id: '1',
    name: 'Band Name 1',
    email: 'email1@bandname1.com',
    genre: 'Rock',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'Provo, UT',
    manager: "Theodore 'Ted' Logan",
    imageURL: 'https://picsum.photos/225',
    fans: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://picsum.photos/275'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://picsum.photos/250'
      }
    ]
  },
  {
    id: '2',
    name: 'Band Name 2',
    email: 'email2@bandname2.com',
    genre: 'Alternative',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'SLC, UT',
    manager: "Bill S. Preston Esquire",
    imageURL: 'https://picsum.photos/230',
    fans: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://picsum.photos/210'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://picsum.photos/245'
      }
    ]
  }
];


class EventDashboard extends Component {
    constructor(props){
        super(props)

        this.state={
            bands: bands,
            isOpen: false,
            selectedBand: null
        }
    }

    handleFormOpen=()=>{
        this.setState({
            selectedBand: null,
            isOpen:true
        })
    }

    handleCancel=()=>{
        this.setState({
            isOpen:false
        })
    }

    handleOpenBand=(bandToUpdate)=>()=>{
        this.setState({
            selectedBand: bandToUpdate,
            isOpen: true
        })
    }

    handleUpdateBand = (updatedBand) => {
        this.setState({
            bands: this.state.bands.map(band=> {
                if (band.id === updatedBand.id) {
                    return Object.assign({}, updatedBand)
                } else {
                    return band
                }
            }),
            isOpen: false,
            selectedBand: null
        })
    }

    handleAddBand=(newBand)=>{
        newBand.id= cuid();
        newBand.imageURL= 'https://picsum.photos/250';
        const updatedBands = [...this.state.bands, newBand]
        this.setState({
            bands: updatedBands,
            isOpen: false
        })
    }

    handleDeleteBand = (bandID) => () => {
        const updatedBands = this.state.bands.filter(event=>event.id !== bandID);
        this.setState({
            bands: updatedBands
        })
    }

  render() {
      const {selectedBand} = this.state;
    return (
      <div>
        <Grid>
            <Grid.Column width={10}>
                <BandList deleteBand={this.handleDeleteBand} onBandOpen={this.handleOpenBand} bands={this.state.bands}/>
            </Grid.Column>
            <GridColumn width={6}>
                <Button onClick={this.handleFormOpen} positive content='Add Your Band' />
                {this.state.isOpen && (
                <BandForm updateBand={this.handleUpdateBand} selectedBand={selectedBand} handleCancel={this.handleCancel} addBand={this.handleAddBand}/>
                )}
            </GridColumn>
        </Grid>
      </div>
    )
  }
}

export default EventDashboard
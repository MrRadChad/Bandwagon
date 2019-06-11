import React, { Component } from "react";
import { connect } from "react-redux";
// import {compose} from 'redux';
import { firestoreConnect } from "react-redux-firebase";
import { Grid, GridColumn } from "semantic-ui-react";
import BandList from "../Bands/BandList";
import { deleteBand } from "../../bandList/bandActions";
import EventActivity from "../BandActivity/BandActivity";

const mapState = state => ({
  bands: state.firestore.ordered.Bands
});

const actions = {
  deleteBand
};

class BandsDashboard extends Component {
  handleDeleteBand = bandId => () => {
    this.props.deleteBand(bandId);
  };

  render() {
    const { bands } = this.props;
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <BandList deleteBand={this.handleDeleteBand} bands={bands} />
          </Grid.Column>
          <GridColumn width={6}>
            <EventActivity />
          </GridColumn>
        </Grid>
      </div>
    );
  }
}

export default connect(
    mapState,
    actions
)(firestoreConnect([{collection:'Bands'}])(BandsDashboard));

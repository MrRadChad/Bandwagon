import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, GridColumn } from "semantic-ui-react";
import BandList from "../Bands/BandList";
import { deleteBand } from "../../bandList/bandActions";


const mapState = state => ({
  bands: state.bands
});

const actions = {
  deleteBand
}

class EventDashboard extends Component {

  handleDeleteBand = bandId => () => {
    this.props.deleteBand(bandId)
  };

  render() {
    const {bands} = this.props;
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <BandList
              deleteBand={this.handleDeleteBand}
              bands={bands}
            />
          </Grid.Column>
          <GridColumn width={6}>
          </GridColumn>
        </Grid>
      </div>
    );
  }
}

export default connect(mapState, actions)(EventDashboard);

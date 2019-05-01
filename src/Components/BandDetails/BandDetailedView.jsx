import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import BandDetailsHeader from "./BandDetailsHeader";
import BandDetailsInfo from "./BandDetailsInfo";
import BandDetailsComments from "./BandDetailsComments";
import BandDetailsSidebar from "./BandDetailsSidebar";
import { connect } from "react-redux";

const mapState = (state, ownProps) => {
  const bandId = ownProps.match.params.id;

  let band = {};

  if (bandId && state.bands.length > 0) {
    band = state.bands.filter(band => band.id === bandId)[0];
  }

  return {
    band
  };
};

function BandDetails({band}) {
  return (
    <Grid>
      <GridColumn width={10}>
        <BandDetailsHeader band={band} />
        <BandDetailsInfo band={band} />
        <BandDetailsComments />
      </GridColumn>
      <GridColumn width={6}>
        <BandDetailsSidebar fans={band.fans} />
      </GridColumn>
    </Grid>
  );
}

export default connect(mapState)(BandDetails);

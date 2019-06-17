import React, {Component} from "react";
import { Grid } from "semantic-ui-react";
import BandDetailsHeader from "./BandDetailsHeader";
import BandDetailsInfo from "./BandDetailsInfo";
import BandDetailsComments from "./BandDetailsComments";
import BandDetailsSidebar from "./BandDetailsSidebar";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";

const mapState = (state, ownProps) => {
  const bandId = ownProps.match.params.id;

  let band = {};

  if (state.firestore.ordered.Bands && state.firestore.ordered.Bands.length > 0) {
    band = state.firestore.ordered.Bands.filter(band => band.id === bandId)[0] || {};
  }

  return {
    band
  };
};

class BandDetails extends Component {

  async componentDidMount () {
    const {firestore, match, history} =this.props;
    let band = await firestore.get(`Bands/${match.params.id}`);
    if (!band.exists){
      history.push('/bands');
    }
  }

  render() {
    const {band} = this.props
    return (
      <Grid>
        <Grid.Column width={10}>
          <BandDetailsHeader band={band} />
          <BandDetailsInfo band={band} />
          <BandDetailsComments />
        </Grid.Column>
        <Grid.Column width={6}>
          {/* <BandDetailsSidebar fans={band.fans} /> */}
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(connect(mapState)(BandDetails));

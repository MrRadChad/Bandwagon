import React, { Component } from "react";
import Band from "./Band";

class BandList extends Component {
  render() {
    const { bands, deleteBand } = this.props;
    return (
      <div>
        {bands && bands.map(band => (
          <Band
            key={band.id}
            band={band}
            deleteBand={deleteBand}
          />
        ))}
      </div>
    );
  }
}
export default BandList;

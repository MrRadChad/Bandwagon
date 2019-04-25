import React, { Component } from 'react'
import Band from './Band';

class BandList extends Component {
  render() {
    const {bands, onBandOpen, deleteBand} = this.props;
    return (
      <div>
        <h1>Bands</h1>
        {bands.map((band) => (
          <Band key={band.id} band={band} onBandOpen={onBandOpen} deleteBand={deleteBand} />
        ))}
      </div>
    )
  }
}
export default BandList
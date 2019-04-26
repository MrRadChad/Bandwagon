import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";

class BandFans extends Component {
  render() {
    const { fan } = this.props;
    return (
      <List.Item>
        <Image as="a" size="mini" circular src={fan.photoURL} />
      </List.Item>
    );
  }
}

export default BandFans;

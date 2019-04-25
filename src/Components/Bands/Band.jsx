import React, { Component } from "react";
import { Segment, Icon, Item, List, Button } from "semantic-ui-react";
import BandFans from "./BandFans";

class Band extends Component {
  render() {
    const { band, onBandOpen, deleteBand } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image
                size="tiny"
                circular
                src={band.imageURL}
              />
              <Item.Content>
                <Item.Header as="a">{band.name}</Item.Header>
                <Item.Description>
                  Managed by <a>{band.manager}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="music" /> {band.genre} |
            <Icon name="play circle" /> listen
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {band.fans && band.fans.map((fan) => (
              <BandFans key={fan.id} fan={fan} />
            ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{band.description}</span>
          <Button onClick={deleteBand(band.id)} as="a" color="red" floated="right" content="Delete" />
          <Button onClick={onBandOpen(band)} as="a" color="teal" floated="right" content="View" />
        </Segment>
      </Segment.Group>
    );
  }
}

export default Band;

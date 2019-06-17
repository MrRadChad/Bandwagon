import React, { Component } from "react";
import { Segment, Icon, Item, List, Button, Label } from "semantic-ui-react";
import BandFans from "./BandFans";
import {Link} from 'react-router-dom'

class Band extends Component {
  render() {
    const { band } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={band.imageURL} />
              <Item.Content>
                <Item.Header as="a">{band.name}</Item.Header>
                <Item.Description>
                  Managed by <a>{band.manager}</a>
                </Item.Description>
                {band.disbanded &&
                <Label
                style ={{top:'-40px'}} 
                ribbon='right'
                color='grey'
                content = 'This band is no longer together'
                />}
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
            {band.fans &&
              Object.values(band.fans).map((fan, index) => (<BandFans key={fan.index} fan={fan} />))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{band.description}</span>
          {/* <Button
            onClick={deleteBand(band.id)}
            as="a"
            color="red"
            floated="right"
            content="Delete"
          /> */}
          <Button
            as={Link}
            to={`/band/${band.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default Band;

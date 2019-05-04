import React from 'react'
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import {Link} from 'react-router-dom'

const bandImageStyle = {
  filter: "brightness(65%)"
};

const bandImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

function BandDetailsHeader({band}) {
  return (
           <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image src={band.imageURL} fluid style={bandImageStyle} />

          <Segment basic style={bandImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={band.name}
                    style={{ color: "white" }}
                  />
                  <p>
                    Managed by <strong>{band.manager}</strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached="bottom">
          <Button color="red">Delete This Band</Button>

          <Button color='rgb(55, 190, 231)'>Love this Band</Button>

          <Button as={Link} to={`/manage/${band.id}`} color="orange" floated="right">
            Manage Details
          </Button>
        </Segment>
      </Segment.Group>
  )
}

export default BandDetailsHeader

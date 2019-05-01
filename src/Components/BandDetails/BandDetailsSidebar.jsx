import React from "react";
import { Segment, List, Label, Item } from "semantic-ui-react";

function BandDetailsSidebar({ fans }) {
  const isMember = false;
  return (
    <div>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {fans && fans.length} {fans && fans.length === 1 ? 'Fan' : 'Fans'}
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {fans && fans.map(fans => (
              <Item key={fans.id} style={{ position: "relative" }}>
                {isMember &&
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  Band Member
                </Label>}
                <Item.Image size="tiny" src={fans.photoURL} />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <a>{fans.name}</a>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </List>
      </Segment>
    </div>
  );
}

export default BandDetailsSidebar;

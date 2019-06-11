import React from "react";
import {Grid, Segment, Item, Header} from 'semantic-ui-react'
import differenceInYears from 'date-fns'


function UserDetailsHeader({profile}) {
    let age;
    if (profile.dateOfBirth){
        age= differenceInYears(Date.now(), profile.dateOfBirth.toDate())
    } else {
        age = 'I Dunno...'
    }
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              avatar
              size="small"
              src={profile.photoURL || '/public/Assets/logo.png'}
            />
            <Item.Content verticalAlign="bottom">
              <Header as="h1">{profile.displayName}</Header>
              <br />
              {profile.instruments[0] && profile.instruments[0].length >0 &&
              <Header as="h3">{profile.instruments[0]}</Header>}
              <br />
              <Header as="h3">{age}, Lives in {profile.city || 'Some Cool Place'}</Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
}

export default UserDetailsHeader;

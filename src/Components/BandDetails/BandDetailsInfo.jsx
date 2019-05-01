import React from 'react'
import {Segment, Grid, Icon, Button} from 'semantic-ui-react'

function BandDetailsInfo({band}) {
  return (
    <Segment.Group>
    <Segment attached="top">
      <Grid>
        <Grid.Column width={1}>
          <Icon size="large" color="teal" name="info" />
        </Grid.Column>
        <Grid.Column width={15}>
          <p>{band.description}</p>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment attached>
      <Grid verticalAlign="middle">
        <Grid.Column width={1}>
          <Icon name="music" size="large" color="teal" />
        </Grid.Column>
        <Grid.Column width={15}>
          <span>{band.genre}</span>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment attached>
      <Grid verticalAlign="middle">
        <Grid.Column width={1}>
          <Icon name="marker" size="large" color="teal" />
        </Grid.Column>
        <Grid.Column width={11}>
          <span>{band.city}</span>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button color="teal" size="tiny" content="Show Map" />
        </Grid.Column>
      </Grid>
    </Segment>
  </Segment.Group>
  )
}

export default BandDetailsInfo


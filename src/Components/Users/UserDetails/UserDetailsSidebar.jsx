import React from 'react'
import {Grid, Button, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function UserDetailsSidebar() {
    return (
        <Grid.Column width={4}>
            <Segment>
                <Button as={Link} to='/settings' color='teal' fluid basic content='Edit Profile'/>
            </Segment>
        </Grid.Column>
    )
}

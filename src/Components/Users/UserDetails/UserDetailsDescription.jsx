import React from 'react'
import {Grid, Header, Icon, Item, List, Segment} from 'semantic-ui-react'
import format from 'date-fns/format'

function UserDetailsDescription({profile}) {
    let createdAt;
    if (profile.createdAt) {
        createdAt=format(profile.createdAt.toDate(), 'mm dd yyyy')
    }
    return (
        <Grid.Column width={12}>
            <Segment>
                <Grid columns={2}>
                    <Grid.Column width={10}>
                        <Header icon='smile' content='About Display Name'/>
                        <p>I listen to: <strong>{profile.genres[0] || 'music'}</strong></p>
                        <p>Member Since: <strong>{createdAt}</strong></p>
                        <p>{profile.description}</p>

                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Header icon='music' content='Instruments'/>
                        {profile.instruments ?
                        <List>
                            {profile.instruments && 
                            profile.instruments.map((instrument, index) => (
                            <Item>
                                <Icon name='heart'/>
                                <Item.Content>{instrument}</Item.Content>
                            </Item>
                            ))}
                        </List> : <p>I don't play any.</p>}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Grid.Column>
    )
}

export default UserDetailsDescription;
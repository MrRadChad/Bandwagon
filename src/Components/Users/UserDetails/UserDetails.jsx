import React, {Component} from 'react';
import {Grid} from "semantic-ui-react";
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import UserDetailsHeader from './UserDetailsHeader';
import UserDetailsDescription from './UserDetailsDescription';
import UserDetailsSideBar from './UserDetailsSidebar';
import UserDetailsFavBands from './UserDetailsFavBands';
import UserDetailsPhotos from './UserDetailsPhotos';

const query = ({auth}) => {
    return [
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [{collection: 'photos'}],
            storeAs: 'photos'
        }
    ]
}

const mapState = (state) => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firestore.ordered.photos
});

class UserDetails extends Component {

    render() {
        const {profile, photos} = this.props;

        return(
            <Grid>
                <UserDetailsHeader profile={profile} />
                <UserDetailsDescription profile={profile} />
                <UserDetailsSideBar />
                {photos && photos.length > 0 &&
                <UserDetailsPhotos photos={photos} />}
                <UserDetailsFavBands />
            </Grid>
        )

    //     return (
    //         <Grid>
                
    //             <Grid.Column width={12}>
    //                 <Segment>
    //                     <Grid columns={2}>
    //                         <Grid.Column width={10}>
    //                             <Header icon='smile' content='About Display Name'/>
    //                             <p>I am a: <strong>Occupation Placeholder</strong></p>
    //                             <p>Originally from <strong>United Kingdom</strong></p>
    //                             <p>Member Since: <strong>28th March 2018</strong></p>
    //                             <p>Description of user</p>

    //                         </Grid.Column>
    //                         <Grid.Column width={6}>

    //                             <Header icon='heart outline' content='Interests'/>
    //                             <List>
    //                                 <Item>
    //                                     <Icon name='heart'/>
    //                                     <Item.Content>Interest 1</Item.Content>
    //                                 </Item>
    //                                 <Item>
    //                                     <Icon name='heart'/>
    //                                     <Item.Content>Interest 2</Item.Content>
    //                                 </Item>
    //                                 <Item>
    //                                     <Icon name='heart'/>
    //                                     <Item.Content>Interest 3</Item.Content>
    //                                 </Item>
    //                             </List>
    //                         </Grid.Column>
    //                     </Grid>

    //                 </Segment>
    //             </Grid.Column>
    //             <Grid.Column width={4}>
    //                 <Segment>
    //                     <Button color='teal' fluid basic content='Edit Profile'/>
    //                 </Segment>
    //             </Grid.Column>

    //             <Grid.Column width={12}>
    //                 <Segment attached>
    //                     <Header icon='image' content='Photos'/>
                        
    //                     <Image.Group size='small'>
                            
    //                     </Image.Group>
    //                 </Segment>
    //             </Grid.Column>

    //             <Grid.Column width={12}>
    //                 <Segment attached>
    //                     <Header icon='music' content='Bands I Love'/>
    //                     <Menu secondary pointing>
    //                         <Menu.Item name='All Events' active/>
    //                         <Menu.Item name='Past Events'/>
    //                         <Menu.Item name='Future Events'/>
    //                         <Menu.Item name='Events Hosted'/>
    //                     </Menu>

    //                     <Card.Group itemsPerRow={5}>

    //                         <Card>
    //                             <Image src={'/assets/categoryImages/drinks.jpg'}/>
    //                             <Card.Content>
    //                                 <Card.Header textAlign='center'>
    //                                     Event Title
    //                                 </Card.Header>
    //                                 <Card.Meta textAlign='center'>
    //                                     28th March 2018 at 10:00 PM
    //                                 </Card.Meta>
    //                             </Card.Content>
    //                         </Card>

    //                         <Card>
    //                             <Image src={'/assets/categoryImages/drinks.jpg'}/>
    //                             <Card.Content>
    //                                 <Card.Header textAlign='center'>
    //                                     Event Title
    //                                 </Card.Header>
    //                                 <Card.Meta textAlign='center'>
    //                                     28th March 2018 at 10:00 PM
    //                                 </Card.Meta>
    //                             </Card.Content>
    //                         </Card>

    //                     </Card.Group>
    //                 </Segment>
    //             </Grid.Column>
    //         </Grid>

    //     );
    }
}

export default connect(mapState)(firestoreConnect(auth => query(auth))(UserDetails));

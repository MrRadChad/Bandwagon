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
        );
    }
}
   

export default connect(mapState)(firestoreConnect(auth => query(auth))(UserDetails));

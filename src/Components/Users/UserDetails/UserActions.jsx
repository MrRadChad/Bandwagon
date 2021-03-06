import moment from 'moment'
import {toastr} from 'react-redux-toastr'
import cuid from 'cuid'
import {asyncActionStart, asyncActionFinish, asyncActionError} from '../../../Async/AsyncActions'

export const updateProfile = (user) =>
    async(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const {isLoaded, isEmpty, ...updatedUser} = user;
        if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
            updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
        }

        try{
            await firebase.updateProfile(user);
            toastr.success("That's the stuff!", "You're account has been updated.")
        } catch (error) {
            console.log(error)
        }
    }

export const uploadProfileImage = (file, fileName) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const imageName =  cuid()
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name: imageName
        };
        try {
            dispatch(asyncActionStart())
            //upload image to firebase
            let uploadedImage = await firebase.uploadFile(path, file, null, options);
            //get url of image
            let downloadURL = await uploadedImage.uploadTaskSnapshot.downloadURL;
            //get userdoc from firestore
            let userDoc = await firestore.get(`users/${user.uid}`);
            //check to see if user already has a photo, if not, update profile image with new image
            if (!userDoc.data().photoURL) {
                await firebase.updateProfile({
                    photoURL: downloadURL
                });
                await user.updateProfile({
                    photoURL: downloadURL
                })
            }
            //add new photo to photo collection
            await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos'}]
            }, {
                name: imageName,
                url: downloadURL
            })
            dispatch(asyncActionFinish())
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError())
            throw new Error("Bummer! The picture couldn't be uploaded.");
        }
    }

export const deletePhoto = (photo) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try {
            await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`)
            await firestore.delete({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos', doc: photo.id}]
            })
        } catch (error) {
            console.log(error);
            throw new Error("Couldn't delete the photo")
        }
    }

export const setMainPhoto = photo =>
async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    try {
        return await firebase.updateProfile({
            photoURL: photo.url
        })
    } catch (error) {
        console.log(error);
        throw new Error ('Problem changing main photo')
    }
}
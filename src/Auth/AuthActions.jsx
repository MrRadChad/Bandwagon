import { SubmissionError, reset } from "redux-form";
import { closeModal } from "../Modals/ModalActions";
import {toastr} from 'react-redux-toastr'

export const login = credentials => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
    dispatch(closeModal());
  };
};

export const registerUser = user => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    await createdUser.updateProfile({
      displayName: user.userName
    });
    let newUser = {
      displayName: user.userName,
      createdAt: firestore.FieldValue.serverTimestamp()
    };
    await firestore.set(`users/${createdUser.uid}`, { ...newUser });
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
};

export const socialLogin = selectedProvider => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    dispatch(closeModal());
    let user = await firebase.login({
      provider: selectedProvider,
      type: "popup"
    });
    if (user.additionalUserInfo.isNewUser) {
      await firestore.set(`users/${user.user.uid}`, {
        displayName: user.profile.displayName,
        photoURL: user.profile.avatarUrl,
        createAt: firestore.FieldValue.serverTimestamp()
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = (credentials) => 
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    try {
      await user.updatePassword(credentials.newPassword1);
      await dispatch(reset('account'));
      toastr.success('Boom Bam Baby!', "You've got a new password!")
    } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
  }

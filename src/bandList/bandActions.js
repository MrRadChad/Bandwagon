import { toastr } from "react-redux-toastr";
import { createNewBand } from "../common/util/helpers";

export const createBand = band => {
    return async (dispatch, getState, {getFirestore, getFirebase}) => {
      const firestore = getFirestore();
      const firebase = getFirebase();
      const user = firebase.auth().currentUser;
      const photoURL = getState().firebase.profile.photoURL;
      const newBand = createNewBand(user, photoURL, band);
        try {
          let createdBand = await firestore.add('Bands', newBand);
          await firestore.set(`band_fan/${createdBand.id}_${user.uid}`, {
            bandId: createdBand.id,
            userUid: user.uid,
            member: true
          })
          toastr.success('Booyah!', 'Band has been added.');
          return createdBand;
        } catch (error) {
            toastr.error('Bummer', 'Something went wrong.')
        }
      };
};

export const updateBand = band => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`Bands/${band.id}`, band)
      toastr.success('Woot Woot!', 'Band has been updated.')
    } catch (error) {
        toastr.error('Shoot', 'Something went wrong.')
    }
  };
};

export const disbandedToggle = (disbanded, bandId) =>
  async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const message = disbanded 
    ? "Dangit! Are you sure y'all want to stop making music together?" 
    : "Booyah! It's awesome that y'all are getting back together. You ready?";
    try {
      toastr.confirm(message, {
        onOk: async () => 
          await firestore.update(`Bands/${bandId}`, {
            disbanded: disbanded
          })
      });
    } catch (error) {

    }
  }

// export const deleteBand = bandId => {
//     return async dispatch => {
//         try {
//           dispatch({
//             type: DELETE_BAND,
//             payload: {
//               bandId
//             }
//           });
//           toastr.success('Success!', 'Band has been deleted.')
//         } catch (error) {
//             toastr.error('Fetch', 'Something went wrong.')
//         }
//       };
// };

import { CREATE_BAND, UPDATE_BAND, DELETE_BAND } from "./bandActionTypes";
import { toastr } from "react-redux-toastr";

export const createBand = band => {
    return async dispatch => {
        try {
          dispatch({
            type: CREATE_BAND,
            payload: {
              band
            }
          });
          toastr.success('Booyah!', 'Band has been added.')
        } catch (error) {
            toastr.error('Bummer', 'Something went wrong.')
        }
      };
};

export const updateBand = band => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_BAND,
        payload: {
          band
        }
      });
      toastr.success('Woot Woot!', 'Band has been updated.')
    } catch (error) {
        toastr.error('Shoot', 'Something went wrong.')
    }
  };
};

export const deleteBand = bandId => {
    return async dispatch => {
        try {
          dispatch({
            type: DELETE_BAND,
            payload: {
              bandId
            }
          });
          toastr.success('Success!', 'Band has been deleted.')
        } catch (error) {
            toastr.error('Fetch', 'Something went wrong.')
        }
      };
};

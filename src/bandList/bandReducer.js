import { CREATE_BAND, UPDATE_BAND, DELETE_BAND } from "./bandActionTypes";
import { createReducer } from "../common/util/reducerUtil";

const initialState = {};

export const createBand = (state, payload) => {
  return [...state, Object.assign({}, payload.band)];
};

export const updateBand = (state, payload) => {
  return [
    ...state.filter(band => band.id !== payload.band.id),
    Object.assign({}, payload.band)
  ];
};

export const deleteBand = (state, payload) => {
  return [...state.filter(band => band.id !== payload.bandId)];
};

export default createReducer(initialState, {
  [CREATE_BAND]: createBand,
  [UPDATE_BAND]: updateBand,
  [DELETE_BAND]: deleteBand
});

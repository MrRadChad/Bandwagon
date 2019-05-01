import { CREATE_BAND, UPDATE_BAND, DELETE_BAND } from "./bandActionTypes";
import { createReducer } from "../common/util/reducerUtil";

const initialState = [
  {
    id: "1",
    name: "Band Name 1",
    email: "email1@bandname1.com",
    genre: "Rock",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "Provo, UT",
    manager: "Theodore 'Ted' Logan",
    imageURL: "https://picsum.photos/225",
    fans: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://picsum.photos/275"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://picsum.photos/250"
      }
    ]
  },
  {
    id: "2",
    name: "Band Name 2",
    email: "email2@bandname2.com",
    genre: "Alternative",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "SLC, UT",
    manager: "Bill S. Preston Esquire",
    imageURL: "https://picsum.photos/230",
    fans: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://picsum.photos/210"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://picsum.photos/245"
      }
    ]
  }
];

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

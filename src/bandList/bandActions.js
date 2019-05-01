import { CREATE_BAND, UPDATE_BAND, DELETE_BAND } from "./bandActionTypes";

export const createBand = (band) => {
    return {
        type: CREATE_BAND,
        payload: {
            band
        }
    }
}

export const updateBand = (band) => {
    return {
        type: UPDATE_BAND,
        payload: {
            band
        }
    }
}

export const deleteBand = (bandId) => {
    return {
        type: DELETE_BAND,
        payload: {
            bandId
        }
    }
}


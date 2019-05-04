import { SIGN_OUT_USER, LOGIN_USER } from "./AuthActionTypes";
import {createReducer} from '../common/util/reducerUtil'

const initialState = {
    currentUser: null,
    authenticated: false
}

export const login = (state, payload) => {
    return {
        ...state,
        authenticated: true,
        currentUser: payload.credentials.email
    }
}

export const signout = (state, payload) => {
    return {
        ...state,
        authenticated: false,
        currentUser: null
    }
}

export default createReducer(initialState, {
    [LOGIN_USER]: login,
    [SIGN_OUT_USER]: signout
})
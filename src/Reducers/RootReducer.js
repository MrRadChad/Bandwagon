import {combineReducers} from 'redux'
import {reducer as FormReducer} from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';
import AuthReducer from '../Auth/AuthReducer'
import bandReducer from '../bandList/bandReducer';
import ModalReducer from '../Modals/ModalReducer';
import AsyncReducer from '../Async/AsyncReducer';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    form: FormReducer,
    bands: bandReducer,
    modals: ModalReducer,
    authenticated: AuthReducer,
    async: AsyncReducer,
    toastr: toastrReducer
})

export default rootReducer
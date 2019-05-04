import {combineReducers} from 'redux'
import {reducer as FormReducer} from 'redux-form';
import testReducer from '../Components/Test/testReducer'
import AuthReducer from '../Auth/AuthReducer'
import bandReducer from '../bandList/bandReducer';
import ModalReducer from '../Modals/ModalReducer';
import AsyncReducer from '../Async/AsyncReducer';

const rootReducer = combineReducers({
    form: FormReducer,
    bands: bandReducer,
    modals: ModalReducer,
    authenticated: AuthReducer,
    async: AsyncReducer
})

export default rootReducer
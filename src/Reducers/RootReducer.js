import {combineReducers} from 'redux'
import testReducer from '../Components/Test/testReducer'
import bandReducer from '../bandList/bandReducer';

const rootReducer = combineReducers({
    bands: bandReducer
})

export default rootReducer
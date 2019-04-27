import {combineReducers} from 'redux'
import testReducer from '../Components/Test/testReducer'

const rootReducer = combineReducers({
    test: testReducer
})

export default rootReducer
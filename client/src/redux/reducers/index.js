import { combineReducers } from 'redux';
import userReducer from './userReducer.js'

const rootReducer = combineReducers({
    currentUser: userReducer
})

export default rootReducer
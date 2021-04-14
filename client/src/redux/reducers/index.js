import { combineReducers } from 'redux';
import errorReducer from './errorReducer.js';
import userReducer from './userReducer.js'

const rootReducer = combineReducers({
    currentUser: userReducer,
    userErrors: errorReducer
})

export default rootReducer
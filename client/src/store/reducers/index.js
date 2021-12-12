import { combineReducers } from 'redux';
import errorReducer from './errorReducer.js';
import authReducer from './authReducer.js';
import contentReducer from './contentReducer';

const rootReducer = combineReducers({
    currentUser: authReducer,
    userErrors: errorReducer,
    userContent: contentReducer
})

export default rootReducer
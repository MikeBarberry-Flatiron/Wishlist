import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import contentReducer from "./contentReducer";

const rootReducer = combineReducers({
  currentUser: authReducer,
  userContent: contentReducer,
});

export default rootReducer;

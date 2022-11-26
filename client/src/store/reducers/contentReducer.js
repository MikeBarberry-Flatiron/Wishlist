import {
  SET_USER_CONTENT,
  DELETE_CONTENT,
  ADD_CONTENT,
  CONTENT_SUCCESS,
} from "../actions/types";

let initialState = {
  userContent: [],
  success: null,
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_CONTENT:
      return {
        ...state,
        userContent: action.payload.user_content,
      };
    case ADD_CONTENT:
      return {
        ...state,
        userContent: [...state.userContent, action.payload.updated_content],
        newPosts: action.payload.new_content,
      };
    case CONTENT_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case DELETE_CONTENT:
      return {
        ...state,
        userContent: [
          ...state.userContent.slice(0, action.payload.deleteIndex),
          ...state.userContent.slice(
            action.payload.deleteIndex + 1,
            state.userContent.length
          ),
        ],
      };
    default:
      return state;
  }
};

export default contentReducer;

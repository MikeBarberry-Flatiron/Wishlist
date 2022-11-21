import {
  SET_USER_CONTENT,
  DELETE_CONTENT,
  UPDATE_LIKES,
  ADD_CONTENT,
  CONTENT_SUCCESS,
} from "../actions/types";

let initialState = {
  userContent: [],
  lifestyleContent: [],
  clothingContent: [],
  technologyContent: [],
  householdContent: [],
  newPosts: [],
  success: null,
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_CONTENT:
      return {
        ...state,
        userContent: action.payload.user_content,
        lifestyleContent: action.payload.user_content?.filter((content) => {
          return content.category === "lifestyle";
        }),
        clothingContent: action.payload.user_content?.filter((content) => {
          return content.category === "clothing";
        }),
        technologyContent: action.payload.user_content?.filter((content) => {
          return content.category === "technology";
        }),
        householdContent: action.payload.user_content?.filter((content) => {
          return content.category === "household";
        }),
        newPosts: action.payload.new_posts,
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
        newPosts: action.payload.newContent,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        newPosts: action.payload,
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
    default:
      return state;
  }
};

export default contentReducer;

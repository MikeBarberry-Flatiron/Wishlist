import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from 'is-empty';

let initialState = {
  username: '',
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        username: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

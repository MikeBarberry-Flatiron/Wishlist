import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';

export const loginUser = (token) => (dispatch) => {
  localStorage.setItem('jwt', token);
  const decoded = jwtDecode(token);
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded.username,
  });
};

export const logoutUser = () => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: SET_CURRENT_USER,
    payload: '',
  });
};

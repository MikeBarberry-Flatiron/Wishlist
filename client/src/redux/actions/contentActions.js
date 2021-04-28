import { SET_USER_CONTENT } from './types';

export const getUserContent = jwt => (dispatch) => {
    fetch('/index', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(jwt)
      })
    .then(res => res.json())
    .then(json => {
        dispatch({
            type: SET_USER_CONTENT,
            payload: json
        })
      });
  };
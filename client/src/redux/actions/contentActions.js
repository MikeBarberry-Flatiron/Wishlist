import { SET_USER_CONTENT } from './types';
import { UPDATE_CONTENT } from './types';

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

export const deleteContent = request => (dispatch) => {
    fetch('/delete', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(request)
      })
    .then(res => res.json())
    .then(json => {
         dispatch({
            type: UPDATE_CONTENT,
            payload: json.updated
        }) 
    })
}

export const addContent = request => (dispatch) => {
    fetch('/add', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(request)
      })
    .then(res => res.json())
    .then(json => {
        dispatch({
            type: UPDATE_CONTENT,
            payload: json.updated
        }) 
    })
}
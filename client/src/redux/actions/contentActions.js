import { SET_USER_CONTENT, UPDATE_CONTENT, UPDATE_LIKES, ADD_CONTENT } from './types';

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
            type: ADD_CONTENT,
            payload: json.updated
        }) 
    })
}

export const likeContent = request => (dispatch) => {
    fetch('/like', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(request)
    })
    .then(res => res.json())
    .then(json => {
        dispatch({
            type: UPDATE_LIKES,
            payload: json.updated_likes
        }) 
    })
}
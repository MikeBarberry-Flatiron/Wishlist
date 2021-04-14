import jwt_decode from 'jwt-decode'
import { SET_CURRENT_USER } from './types';

export const checkUser = user => (dispatch) => {
    fetch('/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then((json) => {
          if (json.status === 200) {
              localStorage.setItem("jwt", json.jwt);
              const { jwt } = json
              const { user_name } = jwt_decode(jwt);
              dispatch({
                    type: SET_CURRENT_USER,
                    payload: user_name
                })
              window.location = '/homepage'
          } else {
              alert(json.message)
          }    
      });
  };

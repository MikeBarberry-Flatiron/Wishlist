import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { SET_CURRENT_USER } from './types'

export const fetchUser = (user) => dispatch => {
    axios.post('/user', user)
    .then(res=>  {
        const token = res.data.jwt;
        const decoded = jwt_decode(token).user_name;

        dispatch(setCurrentUser(decoded))
    })
}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        user: decoded,
    }
}
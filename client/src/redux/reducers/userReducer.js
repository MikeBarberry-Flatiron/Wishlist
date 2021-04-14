import { SET_CURRENT_USER } from '../actions/types'

let initialState = {
    username: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                username: action.payload
            }
        default:
            return state
    }
}

export default userReducer
import { SET_USER_ERRORS } from '../actions/types'

let initialState = {
    error: ''
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ERRORS:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default errorReducer
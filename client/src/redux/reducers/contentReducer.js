import { SET_USER_CONTENT, UPDATE_CONTENT, UPDATE_LIKES } from '../actions/types'

let initialState = {
    userContent: [],
    lifestyleContent: [],
    clothingContent: [],
    technologyContent: [],
    householdContent: [],
    newPosts: [],
}

const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_CONTENT:
            return {
                ...state,
                userContent: action.payload.user_content,
                lifestyleContent: action.payload.user_content.filter(content => {
                    return  content.category === "lifestyle"
                }),
                clothingContent: action.payload.user_content.filter(content => {
                    return  content.category === "clothing"
                }),
                technologyContent: action.payload.user_content.filter(content => {
                    return  content.category === "technology"
                }),
                householdContent: action.payload.user_content.filter(content => {
                    return  content.category === "household"
                }),
                newPosts: action.payload.new_posts
            }
        case UPDATE_CONTENT:
            return {
                ...state,
                userContent: action.payload.updated_content,
                newPosts: action.payload.new_content
            }
        case UPDATE_LIKES:
            return {
                ...state,
                newPosts: action.payload
            }
        default:
            return state
    }
}

export default contentReducer
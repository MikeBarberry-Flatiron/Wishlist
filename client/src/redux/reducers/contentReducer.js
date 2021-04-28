import { SET_USER_CONTENT } from '../actions/types'

let initialState = {
    allContent: [],
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
                allContent: action.payload.all_content,
                lifestyleContent: action.payload.lifestyle_content,
                clothingContent: action.payload.clothing_content,
                technologyContent: action.payload.technology_content,
                householdContent: action.payload.household_ontent,
                newPosts: action.payload.new_posts
            }
        default:
            return state
    }
}

export default contentReducer
import { ERROR_CATEGORIES, GET_CATEGORIES, GET_ONE_CATEGORIES, LOADING_CATEGORIES } from "../actionKey"

const initialState = {
    categories: [],
    categoryById: {},
    loading:false,
    error:false
}

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return { ...state, categories: action.categories }
        case GET_ONE_CATEGORIES:
            return { ...state, categoryById: action.categoryById }
        case LOADING_CATEGORIES:
            return {...state, loading: action.loading}
        case ERROR_CATEGORIES:
            return {...state, error: action.error}
        default:
            return state
    }
}
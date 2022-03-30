import { ERROR_INGREDIENTS, GET_INGREDIENT, LOADING_INGREDIENTS } from "../actionKey";

const initialState = {
    ingredients: [],
    loading: false,
    error: false
}

export default function ingredientReducer(state = initialState, action) {
    switch (action.type) {
        case GET_INGREDIENT:
            return { ...state, ingredients: action.ingredients }
        case LOADING_INGREDIENTS:
            return { ...state, loading: action.loading }
        case ERROR_INGREDIENTS:
            return { ...state, error: action.error }
        default:
            return state
    }
}
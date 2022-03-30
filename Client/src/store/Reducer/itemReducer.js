import { ERROR_ITEMS, GET_ITEMS, GET_ONE_ITEM, LOADING_ITEMS } from "../actionKey"

const initialState = {
    items: [],
    itemById: {},
    loading: false,
    error: false
}

export default function itemReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return { ...state, items: action.items }
        case GET_ONE_ITEM:
            return { ...state, itemById: action.itemById }
        case LOADING_ITEMS:
            return { ...state, loading: action.loading }
        case ERROR_ITEMS:
            return { ...state, error: action.error }
        default:
            return state
    }
}

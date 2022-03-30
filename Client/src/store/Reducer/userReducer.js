import { ERROR_USERS, GET_ONE_USER, GET_USER, LOADING_USERS } from "../actionKey"

const initialState = {
    users: [],
    userById: {},
    loading: false,
    errorUser:false
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return { ...state, users: action.users }
        case GET_ONE_USER:
            return { ...state, userById: action.userById }
        case LOADING_USERS:
            return {...state, loading: action.loading}
        case ERROR_USERS:
            return {...state, errorUser: action.errorUser}
        default:
            return state
    }
}
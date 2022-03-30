import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import ingredientReducer from "./ingredientReducer";
import itemReducer from "./itemReducer";
import userReducer from "./userReducer";


export const reducersCombine = combineReducers({item:itemReducer, category:categoryReducer, user:userReducer, ingredient:ingredientReducer})
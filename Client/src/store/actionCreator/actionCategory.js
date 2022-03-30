import { ERROR_CATEGORIES, GET_CATEGORIES, GET_ONE_CATEGORIES, LOADING_CATEGORIES } from "../actionKey"
import axios from "axios"
import Swal from 'sweetalert2'

export function getCategories() {
    return (dispatch, previous) => {
        dispatch(actionLoadingCategory(true))
        axios({
            url: `http://localhost:3000/categories`,
            method: 'GET',
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .then(({ data }) => {
                console.log(data);
                //setcategories(data)
                dispatch({ type: GET_CATEGORIES, categories: data })

            })
            .catch(err => {
                Swal.fire(err.response.data.message)
            })
            .finally(_=>{
                dispatch(actionLoadingCategory(false))
            })
    }
}
export function getOneCategory(id){
    return(dispatch, previousState) => {
        dispatch(actionLoadingCategory(true))
        axios({
            url: `http://localhost:3000/categories/${id}`,
            method: 'GET',
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .then(({ data }) => {
                dispatch({ type: GET_ONE_CATEGORIES, categoryById: data })
            })
            .catch(err => {
                Swal.fire(err.response.data.message)
            })
            .finally(_=>{
                dispatch(actionLoadingCategory(false))
            })
    }
}

export function actionLoadingCategory(loading){
    return {type:LOADING_CATEGORIES, loading}
}
export function actionErrorCategory(error){
    return {type:ERROR_CATEGORIES, error}
}
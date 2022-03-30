import { ERROR_ITEMS, GET_ITEMS, GET_ONE_ITEM, LOADING_ITEMS } from "../actionKey"
import axios from "axios";
import Swal from 'sweetalert2'

export function getItems() {
    // return {type : GET_ITEMS, items:items}
    return(dispatch, previous) =>{
        dispatch(actionLoadingItem(true))
        axios({
            url: `http://localhost:3000/items`,
            method: 'GET',
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .then(({ data }) => {
                dispatch({
                    type: GET_ITEMS, items:data
                })
            })
            .catch(err => {
                Swal.fire(err.response.data.message)
            })
            .finally(_=>{
                dispatch(actionLoadingItem(false))
            })
    }
}

export function getOneItem(id){
    return (dispatch, previousState) =>{
        dispatch(actionLoadingItem(true))
        axios({
            url: `http://localhost:3000/items/${id}`,
            method: 'GET',
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .then(({ data }) => {
                dispatch({
                    type:GET_ONE_ITEM,
                    itemById:data
                })
            })
            .catch(err => {
                Swal.fire(err.response.data.message)
            })
            .finally(_=>{
                dispatch(actionLoadingItem(false))
            })
    }
}

export function actionLoadingItem(loading){
    return {type:LOADING_ITEMS, loading}
}
export function actionErrorItem(error){
    return {type:ERROR_ITEMS, error}
}
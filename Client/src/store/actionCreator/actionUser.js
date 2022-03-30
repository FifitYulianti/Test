import { ERROR_USERS, GET_ONE_USER, GET_USER, LOADING_USERS } from "../actionKey"
import axios from "axios"
import Swal from 'sweetalert2'

export function getUsers(){
    return(dispatch, previous) =>{
        dispatch(actionLoadingUser(true))
        axios({
            url: `http://localhost:3000/users`,
            method: 'GET',
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .then(({ data }) => {
                dispatch({
                    type: GET_USER, users:data
                })
            })
            .catch(err => {
                console.log(err.response.data.message);
                Swal.fire(err.response.data.message)
            })
            .finally(_=>{
                dispatch(actionLoadingUser(false))
            })
    }
}
export function actionLoadingUser(loading){
    return {type:LOADING_USERS, loading}
}
export function actionErrorUser(error){
    return {type:ERROR_USERS, error}
}
export function getOneUser(id){
    return(dispatch, previousState) => {
        dispatch(actionLoadingUser(true))
        axios({
            url: `http://localhost:3000/users/${id}`,
            method: 'GET',
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .then(({ data }) => {
                dispatch({ type: GET_ONE_USER, userById: data })
            })
            .catch(err => {
                Swal.fire(err.response.data.message)
            })
            .finally(_=>{
                dispatch(actionLoadingUser(false))
            })
    }
}
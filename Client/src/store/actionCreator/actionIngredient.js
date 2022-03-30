import axios from "axios";
import { ERROR_INGREDIENTS, GET_INGREDIENT, LOADING_INGREDIENTS } from "../actionKey";
import Swal from 'sweetalert2'

export function getIngredients(){
    console.log('masuk?');
    return(dispatch, previousState) =>{
        dispatch(actionLoadingIngredient(true))
        axios({
            url: `http://localhost:3000/ingredients`,
            method: 'GET',
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .then(({ data }) => {
                console.log(data);
                dispatch({ type: GET_INGREDIENT, ingredients: data })

            })
            .catch(err => {
                Swal.fire(err.response.data.message)
            })
            .finally(_=>{
                dispatch(actionLoadingIngredient(false))
            })
    }
}
export function actionLoadingIngredient(loading){
    return {type:LOADING_INGREDIENTS, loading}
}
export function actionErrorIngredient(error){
    return {type:ERROR_INGREDIENTS, error}
}
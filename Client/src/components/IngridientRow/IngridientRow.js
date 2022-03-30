import React from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { getIngredients } from "../../store/actionCreator/actionIngredient";
import Swal from 'sweetalert2'

export default function IngredientRow(props){
    let history = useHistory()
    let dispatch = useDispatch()

    function deleteIngredient(e, id){
        e.preventDefault()
        axios({
            url: `http://localhost:3000/ingredients/${id}`,
            method: "DELETE",
            headers:{
                access_token: localStorage.getItem("access_token")
            }
        })
        .then(({data})=>{
            dispatch(getIngredients())
        })
        .catch(err => {
            Swal.fire(err.response.data.message)
        })
    }
    return (
        <>
            <tr>
                <td>{props.ingredient.name}</td>
                <td>{props.ingredient.Item.name}</td>
                <td><button type="button" onClick={(e) => deleteIngredient(e, props.ingredient.id)
                } className='btn btn-danger'>Delete</button></td>
                {/* <td><button type="button" className='btn btn-success' onClick={(e) => getOneCategoryToEditPage(e, props.category.id)
                }>Edit</button></td> */}
            </tr>
        </>
    )
}
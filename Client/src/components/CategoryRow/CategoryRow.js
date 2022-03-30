import React from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { getCategories } from "../../store/actionCreator/actionCategory";
import Swal from 'sweetalert2'

export default function CategoryRow(props){
    let history = useHistory()
    let dispatch = useDispatch()
    function deleteCategory(e, id){
        e.preventDefault()
        axios({
            url: `http://localhost:3000/categories/${id}`,
            method: "DELETE",
            headers:{
                access_token: localStorage.getItem("access_token")
            }
        })
        .then(({data})=>{
            dispatch(getCategories())
        })
        .catch(err => {
            Swal.fire(err.response.data.message)
        })
    }
    function getOneCategoryToEditPage(e, id){
        history.push(`/edit-category/${id}`)
    }
    return (
        <>
            <tr>
                <td>{props.category.name}</td>
                <td><button type="button" onClick={(e) => deleteCategory(e, props.category.id)
                } className='btn btn-danger'>Delete</button></td>
                <td><button type="button" className='btn btn-success' onClick={(e) => getOneCategoryToEditPage(e, props.category.id)
                }>Edit</button></td>
            </tr>
        </>
    )
}
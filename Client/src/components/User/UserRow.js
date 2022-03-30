import React, { useEffect } from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { getUsers } from '../../store/actionCreator/actionUser';
import Swal from 'sweetalert2'

export default function UserRow(props) {
    let history = useHistory()
    let dispatch = useDispatch()
    
    function deleteUser(e, id) {
        e.preventDefault()
        axios({
            url: `http://localhost:3000/users/${id}`,
            method: "DELETE",
            headers:{
                access_token: localStorage.getItem("access_token")
            }
        })
            .then(({ data }) => {
                dispatch(getUsers())
            })
            .catch(err => {
                Swal.fire(err.response.data.message)
            })
    }
    function getOneUserToEditPage(e, id){
        history.push(`/edit-user/${id}`)
    }
    return (
        <>
            <tr>
                <td>{props.user.username}</td>
                <td>{props.user.email}</td>
                <td>{props.user.role}</td>
                <td>{props.user.phoneNumber}</td>
                <td>{props.user.address}</td>
                <td><button type="button" onClick={(e) => deleteUser(e, props.user.id)
                } className='btn btn-danger'>Delete</button></td>
                <td><button type="button" className='btn btn-success' onClick={(e) => getOneUserToEditPage(e, props.user.id)
                }>Edit</button></td>
            </tr>
        </>
    );
}

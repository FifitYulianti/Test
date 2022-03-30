import React from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { getItems } from '../../store/actionCreator/actionItem';
import Swal from 'sweetalert2'

export default function ItemRow(props){
    let history = useHistory()
    let dispatch = useDispatch()
    function deleteData(e, id){
        console.log('masuk');
        e.preventDefault()
        axios({
            url: `http://localhost:3000/items/${id}`,
            method: "DELETE",
            headers:{
                access_token: localStorage.getItem("access_token")
            }
        })
        .then(({data})=>{
            dispatch(getItems())
        })
        .catch(err => {
            Swal.fire(err.response.data.message)
        })
    }
    function getOneToEditPage(e, id){
        history.push(`/edit-item/${id}`)
    }
    return(
        <>
                <tr>
                    <td>{props.item.name}</td>
                    <td><img src={props.item.imgUrl} className="card-img-top" height={"100vh"} width={"50vw"}/></td>
                    <td>{props.item.description}</td>
                    <td>Rp.{props.item.price}</td>
                    <td>{props.item.User.username}</td>
                    <td>{props.item.Category.name}</td>
                    <td><button type="button" onClick={(e) => deleteData(e, props.item.id)
                    } className='btn btn-danger'>Delete</button></td>
                    {/* <td><button type="button" className='btn btn-success' onClick={(e) => props.getOneEditData(e, props.item.id)
                    }>Edit</button></td> */}
                    <td><button type="button" className='btn btn-success' onClick={(e) => getOneToEditPage(e, props.item.id)
                    }>Edit</button></td>
                </tr>
            </>
    )
}

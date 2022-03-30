import axios from 'axios';
import './index.css';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getOneCategory } from '../../store/actionCreator/actionCategory';
import Swal from 'sweetalert2'

export default function FormEditCategory() {
    let { id } = useParams()
    let history = useHistory()

    const [category, setCategory] = useState({ name: '' })
    let categoryById = useSelector(state => state.category.categoryById)
    const loading = useSelector(state => state.category.loading)
    let dispatch = useDispatch()

    function handleOnChange(e) {
        const { name, value } = e.target
        setCategory({ ...category, [name]: value })
        console.log(category);
    }
    function handleOnSubmit(e) {
        e.preventDefault()
        axios({
            url: `http://localhost:3000/categories/${id}`,
            method: 'PUT',
            data: category,
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .then(({ data }) => {
                //props.fetchDataItem()
                history.push('/category-list')
            })
            .catch(err => Swal.fire(err.response.data.message))
    }
    useEffect(() => {
        dispatch(getOneCategory(id))
    }, [])
    useEffect(() => {
        if (Object.keys(categoryById).length !== 0) {
            setCategory({ name: categoryById.name })
        }
    }, [categoryById])
    return (
        <>
            {
                loading ?
                    <div style={{ "textAlign" : "center"}}>
                        <div className="loader">
                        </div>
                        <h1>LOADING...</h1>
                    </div>

                    :
                    <div className="auth">
                        <div className="container">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-7 col-lg-5">
                                    <div className="card">
                                        <div className="card-body">
                                            <form onSubmit={(e) => handleOnSubmit(e)}>
                                                <h3 className="text-primary">EDIT CATEGORY</h3>
                                                <div className="form-group">
                                                    <input type="text" className="form-control"
                                                        placeholder="Enter Name" name='name' value={category.name} onChange={(e) => handleOnChange(e)} />
                                                </div>
                                                <button className="btn btn-outline-dark form-control text-dark">Submit</button>
                                                <br /><br />
                                                <Link className="btn btn-outline-danger form-control" type="button" to={'/category-list'}>Cancel</Link>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
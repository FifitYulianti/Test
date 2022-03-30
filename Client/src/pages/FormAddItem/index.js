import React, { Component, useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from '../../store/actionCreator/actionCategory';
import Swal from 'sweetalert2'

export default function FormAddItem(props) {
    let history = useHistory();
    const [item, setItem] = useState({ name: '', description: '', price: '', imgUrl: '', categoryId: '', ingredient: '' })
    let categories = useSelector(state => state.category.categories)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
    },[])

    function handleOnChange(e) {
        const { name, value } = e.target
        setItem({ ...item, [name]: value })
    }
    function handleOnSubmit(e) {
        e.preventDefault()
        console.log(item);
        axios({
            url: "http://localhost:3000/items",
            method: "POST",
            data: item,
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .then(({ data }) => {
                console.log(data)
                history.push('/item-list')
            })
            .catch(err => {
                console.log(err.response);
                Swal.fire(err.response.data.message)
            })
    }
    return (
        <>
            <div className="auth">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-7 col-lg-5">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={(e) => handleOnSubmit(e)}>
                                        <h3 className="text-primary">ADD ITEMS</h3>
                                        <div className="form-group">
                                            <input type="text" className="form-control"
                                                placeholder="Enter Name" name='name' value={item.name} onChange={(e) => handleOnChange(e)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control"
                                                placeholder="Enter Description" name='description' value={item.description} onChange={(e) => handleOnChange(e)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control"
                                                placeholder="Enter Price" name='price' value={item.price} onChange={(e) => handleOnChange(e)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control"
                                                placeholder="Enter Image URL" name='imgUrl' value={item.imgUrl} onChange={(e) => handleOnChange(e)} />
                                        </div>
                                        <div className="form-group">
                                            <select id="Select" className="form-select" style={{"width":"100%"}} name="categoryId" onChange={(e) => handleOnChange(e)}>
                                                <option disabled>select</option>
                                                {
                                                    categories.map(category => (
                                                        <option key={category.id} value={category.id}>{category.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control"
                                                placeholder="Enter Ingredient" name='ingredient' value={item.ingredient} onChange={(e) => handleOnChange(e)} />
                                        </div>
                                        <button className="btn btn-outline-dark form-control text-dark">Submit</button>
                                        <br /><br />
                                        <Link className="btn btn-outline-danger form-control" type="button" to={'/item-list'}>Cancel</Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

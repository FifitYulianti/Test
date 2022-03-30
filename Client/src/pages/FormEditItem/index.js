import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getOneItem } from '../../store/actionCreator/actionItem';
import { getCategories } from '../../store/actionCreator/actionCategory';
import Swal from 'sweetalert2'

export default function FormEditItem() {
    let { id } = useParams()
    let history = useHistory();

    const [item, setItem] = useState({ name: '', description: '', price: '', imgUrl: '', categoryId: '' })
    let categories = useSelector(state => state.category.categories)
    let dispatch = useDispatch()
    let itemById = useSelector(state => state.item.itemById)
    const loading = useSelector(state => state.item.loading)

    function handleOnChange(e) {
        const { name, value } = e.target
        setItem({ ...item, [name]: value })
        console.log(item);
    }
    function handleOnSubmit(e) {
        e.preventDefault()
        axios({
            url: `http://localhost:3000/items/${id}`,
            method: 'PUT',
            data: item,
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .then(({ data }) => {
                history.push('/item-list')
            })
            .catch(err => Swal.fire(err.response.data.message))
    }
    useEffect(() => {
        dispatch(getOneItem(id))
        dispatch(getCategories())
    }, [])
    useEffect(() => {
        if (Object.keys(itemById).length !== 0) {
            setItem({ name: itemById.name, description: itemById.description, price: itemById.price, imgUrl: itemById.imgUrl, authorId: itemById.authorId, categoryId: itemById.categoryId, createdAt: itemById.createdAt, updatedAt: itemById.updatedAt })
        }
    }, [itemById])
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
                                                <h3 className="text-primary">EDIT ITEMS</h3>
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
                                                    <select id="Select" className="form-select" style={{ "width": "100%" }} name="categoryId" value={item.categoryId} onChange={(e) => handleOnChange(e)}>
                                                        {
                                                            categories.map(category => (
                                                                <option key={category.id} defaultValue={category.name} value={category.id}>{category.name}</option>
                                                            ))
                                                        }
                                                    </select>
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
            }
        </>
    )
}

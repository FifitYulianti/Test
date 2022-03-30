import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getOneUser } from '../../store/actionCreator/actionUser';
import Swal from 'sweetalert2'

export default function FormEditUser() {
    let { id } = useParams()
    let history = useHistory();

    let dispatch = useDispatch()
    let userById = useSelector(state => state.user.userById)
    let loading = useSelector(state => state.user.loading)
    const [user, setUser] = useState({ username: '', email: '', role: '', phoneNumber: '', address: '' })

    function handleOnChange(e) {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        console.log(user);
    }
    function handleOnSubmit(e) {
        e.preventDefault()
        axios({
            url: `http://localhost:3000/users/${id}`,
            method: 'PUT',
            data: user,
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .then(({ data }) => {
                history.push('/user-list')
            })
            .catch(err => {
                Swal.fire(err.response.data.message)
            })
    }
    useEffect(() => {
        if (Object.keys(userById).length !== 0) {
            setUser({ username: userById.username, email: userById.email, password: userById.password, role: userById.role, phoneNumber: userById.phoneNumber, address: userById.address })
        }
    }, [userById])

    useEffect(() => {
        dispatch(getOneUser(id))
    }, [])

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
                                                <h3 className="text-primary">EDIT USER</h3>
                                                <div className="form-group">
                                                    <input type="text" className="form-control"
                                                        placeholder="Enter Username" name='username' value={user.username} onChange={(e) => handleOnChange(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control"
                                                        placeholder="Enter Email" name='email' value={user.email} onChange={(e) => handleOnChange(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control"
                                                        placeholder="Enter Role" name='role' value={user.role} onChange={(e) => handleOnChange(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control"
                                                        placeholder="Enter Phone Number" name='phoneNumber' value={user.phoneNumber} onChange={(e) => handleOnChange(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control"
                                                        placeholder="Enter Address" name='address' value={user.address} onChange={(e) => handleOnChange(e)} />
                                                </div>
                                                <button className="btn btn-outline-dark form-control text-dark">Submit</button>
                                                <br /><br />
                                                <Link className="btn btn-outline-danger form-control" type="button" to={'/user-list'}>Cancel</Link>
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

import React, { useEffect, useState } from 'react';
import './index.css';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function Login(props) {
    let history = useHistory()
    let [input, setInput] = useState({ email: '', password: '' })
    useEffect(() => {
        props.setNavbar(false)
    }, [])

    function handleOnChange(e) {
        let { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    function handleLogin(e) {
        e.preventDefault(e)
        axios({
            url: "http://localhost:3000/login",
            method: 'POST',
            data: input
        })
        .then(({data})=>{
            localStorage.setItem("access_token", data.access_token)
            props.setNavbar(true)
            history.push('/')
        })
        .catch(err=> Swal.fire(err.response.data.message))
    }

    return (
        <>
            <div className="auth mb-5">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-7 col-lg-5">
                            <div className="card">
                                <div className="card-body">
                                <h3 className='text-danger'>SIGN IN</h3>
                                    <form onSubmit={(e)=>handleLogin(e)}>
                                        <div className="form-group">
                                            <input type="email" className="form-control"
                                                aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={(e)=>handleOnChange(e)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control"
                                                placeholder="Password" name="password" onChange={(e)=>handleOnChange(e)} />
                                        </div>
                                        <div className="form-group my-4">
                                            <button to='/' className="btn btn-outline-danger form-control text-danger">SIGN IN</button>
                                        </div>
                                    </form>
                                    <p className="mt-2">New Member? <Link to="/register">Create an account</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

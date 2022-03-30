import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './index.css';
import Swal from 'sweetalert2'

export default function Register(props) {
    let history = useHistory()

    let [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        role: "admin",
        phoneNumber: "",
        address: ""
    })

    useEffect(() => {
        props.setNavbar(false)
    }, [])

    function handleOnChange(e){
        let {name, value} = e.target
        setInput({...input, [name]:value})
    }

    function handleRegister(e){
        e.preventDefault()
        axios({
            url:"http://localhost:3000/register",
            method:"POST",
            data:input
        })
        .then(({data}) =>{
            history.push('/login')
        })
        .catch(err => {
            console.log(err.response);
            Swal.fire(err.response.data.message[0]);
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
                                    <form onSubmit={(e)=> handleRegister(e)}>
                                        <h3 className="text-primary">SIGN UP</h3>
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="exampleInputUsename"
                                                placeholder="Enter Username" name="username" onChange={(e)=>handleOnChange(e)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" id="exampleInputEmail1"
                                                aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={(e)=>handleOnChange(e)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" id="exampleInputPassword1"
                                                placeholder="Password" name="password" onChange={(e)=>handleOnChange(e)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="exampleInputPhoneNumber"
                                                placeholder="Enter Phone Number" name="phoneNumber" onChange={(e)=>handleOnChange(e)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="exampleInputAddress"
                                                placeholder="Enter Address" name="address" onChange={(e)=>handleOnChange(e)} />
                                        </div>
                                        <div className="form-group my-4">
                                            <button className="btn btn-outline-primary form-control text-primary">Create An Account</button>
                                            <br /><br />
                                            <Link to='/login' className="btn btn-outline-danger form-control">Cancel</Link>
                                        </div>
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

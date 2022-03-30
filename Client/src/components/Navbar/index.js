import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

export default function Navbar() {
    let history = useHistory()
    let dispatch = useDispatch()
    
    function handleLogout(e){
        e.preventDefault()
        localStorage.removeItem('access_token')
        history.push('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active medium text-grey-600" aria-current="page" type="button" to={'/'}>Home</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Items
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <Link className="dropdown-item" href="#" to={'/item-list'}>
                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                Item List
                            </Link>
                            <Link className="dropdown-item" href="#" to={'/add-item'}>
                                <i className="fas fa-plus-square mr-2 text-gray-400"></i>
                                Add New Item
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Category
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <Link className="dropdown-item" href="#" to={'/category-list'}>
                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                Category List
                            </Link>
                            <Link className="dropdown-item" href="#" to={'/add-category'}>
                                <i className="fas fa-plus-square mr-2 text-gray-400"></i>
                                Add New Category
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            User
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <Link className="dropdown-item" href="#" to={'/user-list'}>
                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                User List
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Ingridient
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <Link className="dropdown-item" href="#" to={'/ingredient-list'}>
                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                Ingridient List
                            </Link>
                        </div>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <div className="topbar-divider d-none d-sm-block"></div>
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">User <i className="fas fa-user-circle"></i></span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={(e)=>handleLogout(e)}>
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

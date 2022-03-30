import React from 'react';
import { useHistory, Link } from "react-router-dom";

export default function Home() {
    return (
        <div className='container'>
            <h1 style={{ "textAlign": "center" }}>
                HOME
            </h1>
            <br />
            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">USER TABLE</h5>
                            <p className="card-text">You can Access User Table to Update and Delete Data User</p>
                            <Link href="#" className="btn btn-outline-dark"  to={'/user-list'}>Go User Table</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">ITEM TABLE</h5>
                            <p className="card-text">You can Access Item Table to Update and Delete Data Item</p>
                            <Link href="#" className="btn btn-outline-dark"  to={'/item-list'}>Go Item Table</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">CATEGORY TABLE</h5>
                            <p className="card-text">You can Access Category Table to Update and Delete Data Category</p>
                            <Link href="#" className="btn btn-outline-dark"  to={'/category-list'}>Go Category Table</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">INGREDIENT TABLE</h5>
                            <p className="card-text">You can Access Ingredient Table to Delete Data Ingredient in Table</p>
                            <Link href="#" className="btn btn-outline-dark"  to={'/ingredient-list'}>Go Ingredient Table</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

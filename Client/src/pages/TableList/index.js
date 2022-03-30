import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ItemRow from '../../components/ItemRow';
import { getItems } from '../../store/actionCreator/actionItem';

export default function TableList() {
    const items = useSelector(state => state.item.items)
    const loading = useSelector(state => state.item.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getItems())
    }, [])

    return (
        <>
            {
                loading ?
                    <div style={{ "textAlign" : "center"}}>
                        <div className="loader">
                        </div>
                        <h1 style={{ "textAlign" : "center"}}>LOADING...</h1>
                    </div>

                    :
                    <div className='container'>
                        <h1 style={{ "textAlign": "center" }}>Table Item List</h1>
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr style={{ "textAlign": "center" }}>
                                    <th scope="col">Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Category</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map(item => (
                                        <ItemRow key={item.id} item={item} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </>

    )
}

import React, { useEffect } from 'react';
import UserRow from '../../components/User/UserRow';
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../store/actionCreator/actionUser';
import './index.css'

export default function TableListUser(props) {
    const users = useSelector(state => state.user.users)
    const loading = useSelector(state => state.user.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
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
                    <div className='container'>
                        <h1 style={{ "textAlign": "center" }}>Table User List</h1>
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr style={{ "textAlign": "center" }}>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Address</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user => (
                                        <UserRow key={user.id} user={user} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }

        </>
    )
}

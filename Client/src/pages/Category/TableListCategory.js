import React, { useEffect } from "react";
import CategoryRow from "../../components/CategoryRow/CategoryRow";
import {useSelector, useDispatch} from 'react-redux'
import { getCategories } from "../../store/actionCreator/actionCategory";

export default function TableListCategory(props) {
    const categories = useSelector(state => state.category.categories)
    const dispatch = useDispatch()
    const loading = useSelector(state => state.category.loading)
    useEffect(() => {
        dispatch(getCategories())
    }, [])
    
    return(
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
                <h1 style={{"textAlign":"center"}}>Table Category List</h1>
                <br/>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr style={{"textAlign":"center"}}>
                            <th scope="col">Category Name</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(category => (
                                <CategoryRow key={category.id} category={category}/>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        }
        </>
    )
}
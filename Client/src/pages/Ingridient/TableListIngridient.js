import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getIngredients } from '../../store/actionCreator/actionIngredient';
import IngredientRow from '../../components/IngridientRow/IngridientRow';

export default function TableListIngredient() {
    const ingredients = useSelector(state => state.ingredient.ingredients)
    const dispatch = useDispatch()
    console.log(ingredients, 'tableList===============');
    const loading = useSelector(state => state.ingredient.loading)
    useEffect(() => {
        dispatch(getIngredients())
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
                        <h1 style={{ "textAlign": "center" }}>Table Ingredient List</h1>
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr style={{ "textAlign": "center" }}>
                                    <th scope="col">Name</th>
                                    <th scope="col">Item</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ingredients.map(ingredient => (
                                        <IngredientRow key={ingredient.id} ingredient={ingredient} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </>
    )
}   
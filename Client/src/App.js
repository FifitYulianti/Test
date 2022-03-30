import React, { Component, useState } from 'react';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";

import PrivateRoute from './PrivateRoute'

import TableList from './pages/TableList';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import FormAddItem from './pages/FormAddItem';
import FormEditItem from './pages/FormEditItem';
import TableListUser from './pages/User/TableListUser';
import FormEditUser from './pages/User/FormEditUser';
import Login from './pages/Login';
import Register from './pages/Register';
import TableListCategory from './pages/Category/TableListCategory';
import FormEditCategory from './pages/Category/FormEditCategory';
import FormAddCategory from './pages/Category/FormAddCategory';
import TableListIngredient from './pages/Ingridient/TableListIngridient';

export default function App() {

  const [navbar, setNavbar] = useState(true)
  return (
    <>
      {
        navbar ?
          <Navbar></Navbar>
          :
          null
      }
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>

          {/* Items */}

        <PrivateRoute path="/add-item">
          <FormAddItem></FormAddItem>
        </PrivateRoute>
        <PrivateRoute path="/item-list">
          <TableList></TableList>
        </PrivateRoute>
        <PrivateRoute path="/edit-item/:id">
          <FormEditItem></FormEditItem>
        </PrivateRoute>
        
          {/* User */}

        <PrivateRoute path="/user-list">
          <TableListUser/>
        </PrivateRoute>
        <PrivateRoute path="/edit-user/:id">
          <FormEditUser/>
        </PrivateRoute>
                
          {/* Category */}

        <PrivateRoute path="/category-list">
          <TableListCategory></TableListCategory>
        </PrivateRoute>
        <PrivateRoute path="/add-category">
          <FormAddCategory/>
        </PrivateRoute>
        <PrivateRoute path="/edit-category/:id">
          <FormEditCategory/>
        </PrivateRoute>
                
          {/* Ingredient */}

        <PrivateRoute path="/ingredient-list">
          <TableListIngredient/>
        </PrivateRoute>
        <Route path="/login">
          <Login setNavbar={setNavbar}></Login>
        </Route>
        <Route path="/register">
          <Register setNavbar={setNavbar} />
        </Route>
      </Switch>

    </>
  )
}

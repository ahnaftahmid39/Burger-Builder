import React, { Component } from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './BurgerBuilder/Orders/Checkout/Checkout';
import Orders from './BurgerBuilder/Orders/Orders';
import Auth from './Auth/Auth';
import {
    Routes,
    Route, Navigate
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authCheck } from '../Redux/authActionCreators';
import Logout from './Auth/Logout';
import { useEffect } from 'react';

const Main = () => {
    const token = useSelector(s => s.token)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authCheck())
    }, [])
    let routes = (
        <Routes>
            <Route path='/login' element={<Auth />} />
            <Route path='*' element={<Navigate to="/login" replace />} />
        </Routes>
    )

    if (token) {
        routes = (
            <Routes>
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/logout' element={<Logout />} />
                <Route exact path='/' element={<BurgerBuilder />} />
                <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
        )
    }
    return (
        <div>
            <Header />
            <div className="container">
                {routes}
            </div>
        </div>
    )
}

export default Main
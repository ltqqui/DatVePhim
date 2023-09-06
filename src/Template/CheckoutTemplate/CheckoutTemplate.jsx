import React, { Fragment, useEffect } from 'react'
import { Route } from 'react-router-dom';
import { USER_LOGIN } from '../../utils/Setting/config';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const CheckoutTemplate = (props) => {
    const { Component, ...restProps } = props;
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    if(!localStorage.getItem(USER_LOGIN)){
        return <Redirect to='/login' />
    }

    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <Component {...propsRoute} />
        </Fragment>
    }} />
}

export default CheckoutTemplate
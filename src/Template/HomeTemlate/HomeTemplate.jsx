import { Route } from 'react-router-dom'
import Header from './Layout/Header/Header';
import HomeCarousel from './Layout/HomeCarousel/HomeCarousel'
import Footer from './Layout/Footer/Footer';
import { useEffect } from 'react';
export const HomeTemplate = (props) => {
    const { Component, ...resProps } = props;
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    
    return <Route {...resProps} render={(propRoute) => {
        return (
            <>
                <Header/>
                <Component {...propRoute} />
                <Footer/>
            </>
        )
    }} />
}
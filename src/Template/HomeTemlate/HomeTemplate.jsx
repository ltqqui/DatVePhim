import { Route } from 'react-router-dom'
import Header from './Layout/Header/Header';
import HomeCarousel from './Layout/HomeCarousel/HomeCarousel'
import Footer from './Layout/Footer/Footer';
import { useEffect, useRef, useState } from 'react';
export const HomeTemplate = (props) => {
    const { Component, ...resProps } = props;
    const [dataFromChild, setDataFromChild] = useState("");
    // const receiveDataFromChild = (data) => {
    //     setDataFromChild(data);
    //   };
    const [isScrolled, setIsScrolled] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        // Hủy đăng ký sự kiện khi component bị hủy
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    const newRef = useRef('newRef');
    const contactRef=useRef('contactRef');
    const homeRef=useRef('')
    console.log(newRef)
    console.log(contactRef)
    console.log(homeRef)
    const scrollToHome = () => {
        if (homeRef.current) {
            homeRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToNew = () => {
        if (newRef.current) {
            newRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToContact = () => {
        if (contactRef.current) {
            contactRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return <Route {...resProps} render={(propRoute) => {
        return (
            <>
                <Header scrollToNew={scrollToNew}  scrollToContact={scrollToContact} scrollToHome={scrollToHome} isScrolled={isScrolled} dataFromChild={dataFromChild}  {...propRoute}  />
                <Component {...propRoute} newRef={newRef} contactRef={contactRef} homeRef={homeRef}   />
                <Footer/>
            </>
        )
    }} />
}
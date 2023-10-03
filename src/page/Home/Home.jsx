import React, { Fragment, useEffect, useRef } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import { useSelector, useDispatch } from 'react-redux'
import { render } from 'react-dom';
import { getFilm } from '../../redux/actions/QuanLyPhimAction';
import Film from '../../components/Film/Film';
import MultipleRows from '../../components/RSlick/MultipleRowSlick';
import { layDanhSachRapAction } from '../../redux/actions/QuanLyRap';
import HomeCarousel from '../../Template/HomeTemlate/Layout/HomeCarousel/HomeCarousel';
import New from '../New/New';
import Contact from '../Contact/Contact';
import * as WOW from 'wowjs'
export default function Home(props) {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        new WOW.WOW().init();
        window.scrollTo(0, 0)
        dispatch(getFilm());
        dispatch(layDanhSachRapAction())
    }, [])

    console.log(props)

    return (
        <div  >
            <HomeCarousel />
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto flex justify-center multiple">
                    <MultipleRows arrFilm={arrFilm} />
                </div>
            </section>
            <HomeMenu heThongRapChieu={heThongRapChieu} />
            <div ref={props.newRef}>
                <New />
            </div>
            <div ref={props.contactRef} className='wow slideInLeft' >
                <Contact />
            </div>
        </div>
    )
}

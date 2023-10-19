import React, { Component, Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import styleSlick from './MultipleRowSlick.module.css'
import FilmLip from "../Film/FilmLip";
import { useDispatch, useSelector } from 'react-redux'
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/type/FilmType";
import styleHome from '../../page/Home/Home.css'
import { NavLink } from 'react-router-dom'
import { CloudFilled } from "@ant-design/icons";
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styleSlick['slick-next']}`}
        style={{ ...style, display: "block", color: 'gray' }}
        onClick={onClick}
      />
    );
  }

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const MultipleRows = (props) => {
  const [{ width, height }, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  // const [slidesToShow, setSlidesToShow]= useState(2)
  let slidesToShow = 2;
  if (width <= 1240) {
    slidesToShow = 2
  }
  if(width<450){}
  else {
    slidesToShow = 1
  }

  const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: slidesToShow,
    speed: 500,
    rows: 0.5,
    slidesPerRow: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const classDangChieu = dangChieu === true ? 'active_film' : 'none_active_film';
  const classSapChieu = sapChieu === true ? 'active_film' : 'none_active_film';

  const renderFilm = () => {
    return props.arrFilm.slice(0, 20).map((item, index) => {
      return <Fragment key={index}>
        <FilmLip item={item} />
      </Fragment>
    })
  }
  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  }, [])
  console.log(width)
  console.log(slidesToShow)

  return (
    <div className={`${styleSlick.multiple}  `} style={{ width: '75%', height: '100%', textAlign: 'center' }} >
      <div className="button">
        <button type="button" className={` ${styleSlick[classDangChieu]} px-8 py-3 font-semibold border rounded  border-gray-800 mb-2 ml-3 border hover:scale-105 transition-all `} onClick={() => {
          dispatch({
            type: SET_PHIM_DANG_CHIEU
          })
        }}>PHIM ĐANG CHIẾU</button>
        <button type="button" className={` ${styleSlick[classSapChieu]} px-8 py-3 font-semibold border rounded  border-gray-800 mb-2 ml-3 border hover:scale-105 transition-all  `} onClick={() => {
          dispatch({
            type: SET_PHIM_SAP_CHIEU
          })
        }} >PHIM SẮP CHIẾU</button>
      </div>
      <div className={styleSlick}>
        <Slider {...settings} className="mt-5 multipleSlide" >
          {renderFilm()}
        </Slider>
      </div>
      <div className="multiple-mobile" style={{ display: 'none' }}>
        {props.arrFilm.slice(0, 6).map((item, index) => {
          return <div key={index} className="card text-white bg-primary">
            <img className="card-img-top" src={item.hinhAnh} alt='' />
            <div className="card-body">
              <h4 className="card-title">{item.tenPhim}</h4>
              <NavLink to={`/detail/${item.maPhim}`} style={{ display: 'block', color: 'white' }} className="bg-orange-300 text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold text-lg">ĐẶT VÉ
              </NavLink>
              <p className="card-text">Text</p>
            </div>
          </div>
        })}
      </div>
    </div>


  );
}
export default MultipleRows
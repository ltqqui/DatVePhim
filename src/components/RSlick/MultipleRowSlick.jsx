import React, { Component, Fragment } from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import styleSlick from './MultipleRowSlick.module.css'
import FilmLip from "../Film/FilmLip";
import {useDispatch, useSelector} from 'react-redux'
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/type/FilmType";
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
  const {dangChieu,sapChieu}=useSelector(state=> state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const classDangChieu= dangChieu === true ? 'active_film' : 'none_active_film';
  const classSapChieu= sapChieu === true ? 'active_film' : 'none_active_film';  

  const renderFilm = () => {
    return props.arrFilm.slice(0, 12).map((item, index) => {
      return <Fragment key={index}>
        <FilmLip item={item} />
      </Fragment>
    })
  }

  return (
    <div   style={{  width: '75%', height: '100%' , textAlign:'center' }} >
      <button type="button" className={` ${styleSlick[classDangChieu]} px-8 py-3 font-semibold border rounded  border-gray-800 mb-2 ml-3 border `} onClick={()=>{
        dispatch({
          type:SET_PHIM_DANG_CHIEU
        })
      }}>PHIM ĐANG CHIẾU</button>
      <button type="button" className={` ${styleSlick[classSapChieu]} px-8 py-3 font-semibold border rounded  border-gray-800 mb-2 ml-3 border `} onClick={()=>{
        dispatch({
          type:SET_PHIM_SAP_CHIEU
        })
      }} >PHIM SẮP CHIẾU</button>
      <Slider {...settings} className="mt-5">
        {renderFilm()}
      </Slider>
    </div>


  );
}
export default MultipleRows
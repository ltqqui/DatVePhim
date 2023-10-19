import { Carousel } from 'antd';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCarouselAction } from '../../../../redux/actions/CarouselAction';
import './HomeCarousel.css'
const contentStyle = {
    height:'750px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',

};

export default function HomeCarousel() {
    const dispatch =useDispatch();
    
 useEffect(()=>{
    dispatch(getCarouselAction())
 },[])
    const { arrCarousel } = useSelector(state => state.CarouselReducer);
    return (
        <Carousel effect="fade" style={{width:'100%',padding:0,margin:0}} >
            {arrCarousel.map((item, index) => {
                return <div key={index} style={{height:'100%'}}>
                    <div className='slick-carousel' style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh}) `, backgroundSize:'cover', backgroundRepeat:'none-repeat', width:'100%' }}>
                    </div>
                </div>
            })}
        </Carousel>
    )
}

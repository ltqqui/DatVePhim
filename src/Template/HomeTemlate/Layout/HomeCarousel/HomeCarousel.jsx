import { Carousel } from 'antd';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCarouselAction } from '../../../../redux/actions/CarouselAction';
import './HomeCarousel.css'
const contentStyle = {
    height: '750px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: '100%', 
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
                return <div key={index}>
                    <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh}) `, backgroundSize:'cover', backgroundPosition:'center', backgroundRepeat:'none' }}>
                        <img src={item.hinhAnh} className="opacity-0" alt={item.hinhAnh} />
                    </div>
                </div>
            })}
        </Carousel>
    )
}

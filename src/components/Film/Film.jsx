import React from 'react'

export default function Film(props) {
    const {item}=props
  return (
    <div className="h-full w-full  bg-gray-100 bg-opacity-75  pb-24 rounded-lg overflow-hidden text-center relative mr-2 mt-3">
        <div style={{backgroundImage:`url(${item.hinhAnh})`,height:'300px', width:'250px' , backgroundPosition:'center', backgroundSize:'cover', borderRadius:'5px'}}/>
        <h2  className="leading-relaxed  h-5 text-base">{item.tenPhim}</h2>
        <div className="text-center  leading-none flex justify-start absolute bottom-0 left-0 w-full ">   
          <span className='font-bold text-lg'>{item.danhGia}</span > <i  className="fa-solid fa-star text-yellow-400 text-lg"></i>
        </div>
    </div>
  )
}

import React from 'react'
import './FilmLip.css'
import { PlayCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd';
import {NavLink} from 'react-router-dom'
export default function FilmLip(props) {
  const { item } = props
  return (
    <div className="flip-card" >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          < div style={{ backgroundImage: `url(${item.hinhAnh})`, width: '250px', height: '300px', backgroundPosition: 'center', backgroundSize: 'cover' }} />
          {/* <img src={item.hinhAnh} className='opacity-0' alt="Avatar" style={{ width: 250, height: 300 }} /> */}
        </div>
        <div className="flip-card-back " style={{ position: 'relative' }}>
          < div style={{ backgroundImage: `url(${item.hinhAnh})`, width: '250px', height: '300px', backgroundPosition: 'center', backgroundSize: 'cover' }} />
          <div style={{ width: 250, height: 300, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <PlayCircleOutlined style={{ zIndex: 5, fontSize: '50px', cursor: 'pointer' }} />
              <p className='text-lg mt-2'>{item.tenPhim}</p>
            </div>
          </div>
        </div>
      </div>
      <NavLink to={`/detail/${item.maPhim}`} style={{display:'block', color:'white'}} className="bg-orange-300 text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold">ĐẶT VÉ
      </NavLink>
    </div>

  )
}

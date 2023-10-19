import { Radio, Space, Tabs } from 'antd';
import React, { Fragment, useState } from 'react';
import {NavLink} from 'react-router-dom'
import './HomeMenu.css'
import moment from 'moment'
export default function HomeMenu(props) {
  const { heThongRapChieu } = props
  const [{ width, height }, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  let tabPos='left'
  if(width<600){
    tabPos='top'
  }
  const renderHomeMenu = () => {
    return heThongRapChieu?.map((heThongRap, index) => {
      return <Fragment  key={index}>
        <Tabs.TabPane className='HTR' style={{width:'100%', padding:'0',}} tab={
           <div className='flex justify-center'>
           <img src={heThongRap.logo} className='rounded-full' width={50} height={50} alt='' />
           <div style={{ display: 'flex', alignItems: 'center' }}>
             <p style={{ lineHeight: '10px', padding: '0px', marginLeft: 0, marginBottom: 0, marginLeft: '10px', fontWeight: '500' }}></p>
           </div>
         </div>
        } width='50' key={index}>
          <div  >
            <Tabs tabPosition='left'  defaultActiveKey="1"  style={{height:700}}>
              {heThongRap.lstCumRap.map((cumRap, index) => {
                return <Fragment  key={index}>
                  <Tabs.TabPane style={{height:700, overflowY:'scroll', }}  tab={ 
                    <div style={{ display: 'flex' ,width:'300px' }}>
                      <img src={cumRap.hinhAnh} width={60} height={60} className='rounded' alt="" />
                      <div>
                        <p className={heThongRap.maHeThongRap === 'BHDStar' ? 'font-bold ml-2 text-left mb-0 text-green-600' : heThongRap.maHeThongRap === 'CGV' ? 'font-bold ml-2  mb-0 text-left text-red-600' : heThongRap.maHeThongRap === 'Galaxy' ? 'font-bold text-left  mb-0 text-orange-600 ml-2' : heThongRap.maHeThongRap === 'LotteCinima' ? 'font-bold text-red-600  mb-0 ml-2 text-left' : heThongRap.maHeThongRap === 'CineStar' ? 'font-bold text-purple-600 ml-2  mb-0 text-left' : 'text-yellow-600 font-bold  mb-0 ml-2 text-left'}>{cumRap.tenCumRap}</p>
                        <span className='ml-2' style={{ marginTop: '-10px' }}>{cumRap.diaChi}</span> <br />
                        <p className='text-red-500 text-left ml-2 my-0'>[Chi tiết]</p>
                      </div>
                    </div>
                  } key={index}>
                      {cumRap?.danhSachPhim.map((phim,index)=>{
                        return <Fragment key={index}>
                            <div className='showtime' style={{width:'100%',margin:0,padding:'0px', display:'flex', marginTop:15}}>
                                <img src={phim.hinhAnh} style={{width:90, height:100}} className='img-film' alt="" />
                                <div className='ml-3'>
                                  <p c className='font-bold my-0 text-lg tenPhim'>{phim.tenPhim}</p>
                                  <p className='font-semibold '>{cumRap.diaChi}</p>
                                  <div className=' time grid grid-cols-3 gap-6'>
                                    {phim.lstLichChieuTheoPhim?.slice(0,6).map((gio, index)=>{
                                      return <NavLink   to ={`./detail/${phim.maPhim}`} className='p-2 border text-sm hover:border-green-500 rounded-sm' key={index}>
                                        {moment(gio.ngayChieuGioChieu).format('hh:mm:A')}
                                      </NavLink>
                                    })}
                                  </div>
                                </div>
                            </div>
                            <br />
                            <hr />
                        </Fragment>
                      })}
                  </Tabs.TabPane>
                </Fragment>
              })}
            </Tabs>
          </div>
        </Tabs.TabPane>
      </Fragment>
    })
  }

  return (
    <div className='mx-72 home-menu' style={{ height: '700px' }}>
      <Tabs tabPosition={tabPos}  defaultActiveKey="1"  >
        {renderHomeMenu()}
      </Tabs>
    </div>
  )
}

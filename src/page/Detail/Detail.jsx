import React, { memo, useEffect, useState } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/css/Circle.css'
import { useSelector, useDispatch } from 'react-redux'
import { Radio, Space, Tabs } from 'antd';
import { layThongTinLichChieuAction } from '../../redux/actions/QuanLyPhimAction'
import moment from 'moment'
import { Rate } from 'antd';
import './Detail.css'
import { NavLink } from 'react-router-dom'
 function Detail(props) {
  const dispatch = useDispatch();
  console.log(123)
  const { id } = props.match.params
  const [{ width, height }, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  let tabPos='left'
  if(width<400){
    tabPos='top'
  }
  const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);
  useEffect(() => {
    dispatch(layThongTinLichChieuAction(id))
    window.scrollTo(0,0)
  }, [])
  return (
    <div className='detail'  style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, width:'100%', backgroundPosition: 'center', backgroundSize: 'cover', minHeight: '100vh' } }>
      <CustomCard style={{ minHeight: '100vh', paddingTop: '150px', width:'100%' }}
        effectColor="##fff"
        color="#fff"
        blur={10}
        borderRadius={0}
      >
        <div className=' detail-top grid grid-cols-12'>
          <div className='detail-top-left col-span-4 col-start-4'>
            <div className='grid grid-cols-2 gap-3 info  '>
              <img src={filmDetail.hinhAnh} alt="" />
              <div className='mt-40 info1' >
                <p className='text-lg text-white font-medium date-film '>Ngày khởi chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
                <p className='text-3xl text-white name-film'>{filmDetail.tenPhim}</p>
              </div>
            </div>
          </div>
          <div className=' detail-top-right col-span-4 col-start-9'>
            <div className={`c100 p${filmDetail.danhGia * 10} big`}>
              <span>{filmDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
          </div>
          <div className='col-start-9 col-span-2 rate-detail' style={{ marginTop: -120, marginLeft: 20 }}>
            <Rate allowHalf value={filmDetail.danhGia / 2} style={{ fontSize: '35px' }} />
          </div>
        </div>
        <div className='grid grid-cols-12 m mt-20 detail-bottom' style={{width:'100%'}}>
          <div className='col-span-7 col-start-4 bg-white rounded-sm  detail-item' style={{ height: '100%', width:'100%' }}>
            <Tabs defaultActiveKey='1' tabPosition='top'>
              <Tabs.TabPane style={{padding:'0 5px'}} tab={<p className='text-xl choose' >Lịch chiếu</p>} key="1">
                <Tabs defaultActiveKey='2' tabPosition={tabPos}>
                  {filmDetail.heThongRapChieu?.map((cumRam, index) => {
                    return <Tabs.TabPane style={{height:500, overflowY:'scroll'}}  key={index}  tab={
                      <div className='flex justify-center'>
                        <img src={cumRam.logo} className='rounded-full' width={50} height={50} alt='' />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        </div>
                      </div>
                    }>
                      {cumRam.cumRapChieu?.map((rap, index) => {
                        return <div key={index}  >
                          <div className='flex'>
                            <img src={rap.hinhAnh} style={{ width: 90, height: 100 }} alt="" />
                            <div>
                              <p style={{ padding: 0, }} className='ml-2 mb-0 font-medium text-lg'>{rap.tenCumRap}</p>
                              <p className='ml-2 mb-0 font-normal text-base'>{rap.diaChi}</p>
                              <div className='grid grid-cols-4 gap-6 ml-2 gioChieu'>
                                {rap.lichChieuPhim?.slice(0, 8).map((gio, index) => {
                                  return <NavLink  to={`/checkout/${gio.maLichChieu}`} className='p-2 border text-sm hover:border-green-500 rounded-sm text-center' key={index}>
                                    {moment(gio.ngayChieuGioChieu).format('hh:mm:A')}
                                  </NavLink>
                                })}
                              </div>
                            </div>
                          </div>
                          <br />
                          <hr />
                        </div>
                      })}
                    </Tabs.TabPane>
                  })}
                </Tabs>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<p className='text-xl choose' >Thông tin</p>} key="2">
                <div className='grid grid-cols-2 p-10'>
                  <div className='col-span-1'>
                    <p className='text-black font-medium text-lg'> Ngày khởi chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                    <p>Đạo diễn:</p>
                    <p>Diễn viên:</p>
                    <p> Thể loại:</p>
                    <p>Quốc gia:</p>
                  </div>
                  <div className='col-span-1'>
                    <h4 className='text-center text-xl '>Nội dung</h4>
                    <p className='text-base'>{filmDetail.moTa}</p>
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<p className='text-xl choose' >Đánh giá</p>} key="3">
                <div className='danhGia' style={{ marginTop: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                    <span style={{color:'blue !important'}}>{filmDetail.danhGia * 10}%</span>
                    <div className="slice">
                      <div className="bar "></div>
                      <div className="fill "></div>
                    </div>
                  </div>
                  <div className='col-start-9 col-span-2 star' style={{ marginLeft: 40 }}>
                    <Rate allowHalf value={filmDetail.danhGia / 2} style={{ fontSize: '35px' }} />
                  </div>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </CustomCard>
    </div>
  )
}

export default memo (Detail)
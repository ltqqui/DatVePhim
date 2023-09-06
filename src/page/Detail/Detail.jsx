import React, { useEffect } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/css/Circle.css'
import { useSelector, useDispatch } from 'react-redux'
import { Radio, Space, Tabs } from 'antd';
import { layThongTinLichChieuAction } from '../../redux/actions/QuanLyPhimAction'
import moment from 'moment'
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom'
export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params
  const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);
  console.log(filmDetail) 
  useEffect(() => {
    dispatch(layThongTinLichChieuAction(id))
  }, [])
  return (
    <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundPosition: 'center', backgroundSize: 'cover', minHeight: '100vh' }}>
      <CustomCard style={{ minHeight: '100vh', paddingTop: '150px' }}
        effectColor="##fff"
        color="#fff"
        blur={10}
        borderRadius={0}
      >
        <div className='grid grid-cols-12'>
          <div className='col-span-4 col-start-4'>
            <div className='grid grid-cols-2 gap-3'>
              <img src={filmDetail.hinhAnh} alt="" />
              <div className='mt-40' >
                <p className='text-lg text-white font-medium '>Ngày khởi chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
                <p className='text-3xl text-white'>{filmDetail.tenPhim}</p>
              </div>
            </div>
          </div>
          <div className='col-span-4 col-start-9'>
            <div className={`c100 p${filmDetail.danhGia * 10} big`}>
              <span>{filmDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
          </div>
          <div className='col-start-9 col-span-2' style={{ marginTop: -120, marginLeft: 20 }}>
            <Rate allowHalf value={filmDetail.danhGia / 2} style={{ fontSize: '35px' }} />
          </div>
        </div>
        <div className='grid grid-cols-12 m mt-20'>
          <div className='col-span-7 col-start-4 bg-white rounded-sm ' style={{ height: '100%' }}>
            <Tabs defaultActiveKey='1'>
              <Tabs.TabPane   tab={<p className='text-xl' >Lịch chiếu</p>} key="1">
                <Tabs defaultActiveKey='2' tabPosition='left'>
                  {filmDetail.heThongRapChieu?.map((cumRam, index) => {
                    return <Tabs.TabPane style={{height:500, overflowY:'scroll'}}  key={index}  tab={
                      <div className='flex justify-center'>
                        <img src={cumRam.logo} className='rounded-full' width={50} height={50} alt='' />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <p style={{ lineHeight: '10px', padding: '0px', marginLeft: 0, marginBottom: 0, marginLeft: '10px', fontWeight: '500' }}>{cumRam.tenHeThongRap}</p>
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
                              <div className='grid grid-cols-4 gap-6 ml-2'>
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
              <Tabs.TabPane tab={<p className='text-xl' >Thông tin</p>} key="2">
                <div className='grid grid-cols-2 p-10'>
                  <div className='col-span-1'>
                    <p className='text-black font-medium text-lg'> Ngày khởi chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                    <p>Đạo diễn:</p>
                    <p>Diễn viên:</p>
                    <p> Thể loại:</p>
                    <p>Quốc gia:</p>
                  </div>
                  <div className='col-span-1'>
                    <h4 className='text-center text-xl'>Nội dung</h4>
                    <p className='text-base'>{filmDetail.moTa}</p>
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<p className='text-xl' >Đánh giá</p>} key="3">
                <div style={{ marginTop: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                    <span style={{color:'blue !important'}}>{filmDetail.danhGia * 10}%</span>
                    <div className="slice">
                      <div className="bar "></div>
                      <div className="fill "></div>
                    </div>
                  </div>
                  <div className='col-start-9 col-span-2' style={{ marginLeft: 40 }}>
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

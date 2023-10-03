import React, { Fragment, useEffect, useState } from 'react'
import manHinh from '../../assets/img/screen.png'
import { useSelector, useDispatch } from 'react-redux'
import { datVeAction, layThongTinPhongVeAction } from '../../redux/actions/ThongTinPhongVeAction';
import style from './Checkout.module.css'
import './Checkout.css'
import _ from 'lodash'
// import './Checkout.css'
import { CheckOutlined, CloseOutlined, UserOutlined, SmileOutlined, HomeOutlined } from '@ant-design/icons'
import { CHANGE_TAB_ACTIVE, SET_GHE_DANG_DAT } from '../../redux/type/ThongTinPhongVeType';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Modal, Tabs } from 'antd';
import { layThongTinNguoiDungAction, layThongTinNguoiDungCheckoutAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { connect } from 'formik';
// import {connection} from '../../index'
import {history} from '../../App'
function Checkout(props) {
  const { id } = props.match.params
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.ThongTinPhongVeReducer);
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(420);

  const errorCheckout = async () => {
    console.log(123)
    await Modal.info({
        title: 'Quyền truy cập ',
        content: 'Đã hết thời gian đặt vé bạn có muốn quay lại trang trang đặt vé ?',
        onOk:()=>{
          history.go(1)
        },
        okCancel:()=>{}
      });
      history.push('/')
    };
    console.log(props)

 
  useEffect(() => {
    dispatch(layThongTinPhongVeAction(props.match.params.id))
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [])

  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    if(seconds===0){
      errorCheckout()
      history.goBack()
    }
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const renderGhe = () => {
    return danhSachGhe.map((ghe, index) => {
      const classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
      const classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
      let classGheTuDat = '';
      if (ghe.taiKhoanNguoiDat === userLogin.taiKhoan) {
        classGheTuDat = 'gheTuDat';
      }
      let classGheKhachDat = '';
      let indexGheKhachDat = danhSachGheKhachDat.findIndex((gheKD => gheKD.maGhe === ghe.maGhe))
      if (indexGheKhachDat !== -1) {
        classGheKhachDat = 'gheKhachDat'
      }
      let classGheDangDat = '';
      let indexGheDangDat = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.maGhe === ghe.maGhe);
      
      if (indexGheDangDat !== -1) {
        classGheDangDat = 'gheDangDat'
      }
      return <Fragment key={index}>
        <button onClick={() => {
          dispatch({
            type: SET_GHE_DANG_DAT,
            gheDangDat: ghe
          })
        }} disabled={ghe.daDat || classGheKhachDat !==''} className={` ${style[classGheDangDat]} ${style[classGheDaDat]} ${style[classGheVip]}  ${style['ghe']} ${style[classGheTuDat]} ${style[classGheKhachDat]}`}>
          {ghe.daDat ? ghe.taiKhoanNguoiDat === userLogin.taiKhoan ? <UserOutlined className='gheDaDatIcon' style={{ fontSize: '20px', color: 'orange', fontWeight:'100' }} /> : <CloseOutlined  className='gheKhachDatIcon' style={{ fontSize: '25px', fontWeight: 600 }} /> : classGheDaDat!=='' ? <SmileOutlined/>  : ghe.stt}
        </button>
        {(index + 1) % 16 === 0 ? <br /> : ''}
      </Fragment>
    })
  }
  return (
    <div className={`grid grid-cols-12 h-screen ${style.checkout} `}>
      <div className='col-span-9'>
        <div className=' mt-5 flex flex-col justify-center items-center'>
            <div  className='w-full text-red-500 text-3xl text-right mr-52 font-semibold pb-2'> <span className='font-normal countDown'>Thời gian còn lại : </span>{formatTime(timer)}</div>
          <div className='mb-10 w-full flex justify-center'>
            <img src={manHinh} style={{ width: '80%' }} alt="" />
          </div>
          <div className={`mx-10 ${style.sit}` } style={{ marginTop: '-80px' }}>
            {renderGhe()}
          </div>
        </div>
        <div className={`w-full   flex justify-center ${style.info_sit}`}>
          <table className="table-auto mb-0">
            <thead className='px-5'>
              <tr className=''>
                <th className='px-5'>Ghế chưa đặt</th>
                <th className='px-5'>Ghế đã đặt</th>
                <th className='px-5'>Ghế đang đặt</th>
                <th className='px-5'>Ghế tự đặt</th>
                <th className='px-5'>Ghế Vip</th>
                <th className='px-5'>Ghế Khách đặt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='text-center'>
                  <button className={style.ghe}></button>
                </td>
                <td className='text-center'>
                  <button className={`${style.gheDaDat} ${style.ghe}`}></button>
                </td>
                <td className='text-center'>
                  <button className={`${style.gheDangDat} ${style.ghe}`}></button>
                </td>
                <td className='text-center'>
                  <button className={`${style.gheTuDat} ${style.ghe}`}></button>
                </td>
                <td className='text-center'>
                  <button className={`${style.gheVip} ${style.ghe}`}></button>
                </td>
                <td className='text-center'>
                  <button className={`${style.gheKhachDat} ${style.ghe}`}></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      <div className={`${style.info_sit_mobile}`} style={{display:'none'}}>
      <button className={style.ghe}></button> : Ghế chưa đặt <br /> 
      <button className={`${style.gheDaDat} ${style.ghe}`}></button>: Ghế đã đặt <br /> 
      <button className={`${style.gheDangDat} ${style.ghe}`}></button> : Ghế đang đặt <br /> 
      <button className={`${style.gheTuDat} ${style.ghe}`}></button>: Ghế tự đặt <br /> 
      <button className={`${style.gheVip} ${style.ghe}`}></button> : Ghế Vip <br /> 
      <button className={`${style.gheKhachDat} ${style.ghe}`}></button> : Ghế khách đặt <br />
      </div>
      </div>
      <div className='col-span-3 h-full'>
        <div className={` px-5 h-3/5 ${style.datVe} `}>
          <h3 className='text-green-500 text-center text-4xl'>{danhSachGheDangDat.reduce((tong, ghe, index) => {
            return tong += ghe.giaVe
          }, 0).toLocaleString()}VND</h3>
          <hr />
          <h3 className='text-lg font-bold'>{thongTinPhim.tenPhim}</h3>
          <p className='text-lg font-medium'>{thongTinPhim.tenCumRap}</p>
          <p className='text-lg font-medium'>{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} - {thongTinPhim.tenCumRap} </p>
          <hr />
          <div className='flex justify-between w-full  py-4'>
            <span className='text-xl w-2/3 font-medium text-red-500 '> <b className='mr-2'>Ghế</b>
              {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                return <Fragment key={index}>
                  {index > 0 ? ',' : ''} {gheDD.stt}
                </Fragment>
              })}
            </span>
            <div className='text-xl text-right  w-1/3 text-green-500 font-medium'>{danhSachGheDangDat.reduce((tong, ghe, index) => {
              return tong += ghe.giaVe
            }, 0).toLocaleString()}VND</div>
          </div>
          <hr />
          <div className='text-lg p-4'>
            <i>Email</i> <br />
            <span>{userLogin.email}</span>
          </div>
          <hr />
          <div className='text-lg p-4'>
            <i>Phone</i> <br />
            <span>{userLogin.soDT}</span>
          </div>
          <hr />
        </div>
        <div className='h-2/5 ' style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
          <div className='bg-green-600 p-3 text-center text-white text-lg font-medium mb-5 cursor-pointer' onClick={() => {
            const thongTinVeDaDat = new ThongTinDatVe();
            thongTinVeDaDat.maLichChieu = props.match.params.id;
            thongTinVeDaDat.danhSachVe = danhSachGheDangDat;
            dispatch(datVeAction(thongTinVeDaDat))
          }}  >ĐẶT VÉ</div>
        </div>
      </div>
    </div>
  )
}




export default function Demo(props) {
  const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
  const { tabActive } = useSelector(state => state.ThongTinPhongVeReducer)
  const dispatch = useDispatch()
  console.log(thongTinNguoiDung)
  useEffect(() => {
    dispatch(layThongTinNguoiDungCheckoutAction())
  }, [])

  const renderTicketItem = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe)
      return <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full h-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-full   bg-gray-100 object-cover object-center flex-shrink-0  mr-4" src={ticket.hinhAnh} />
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-bold">{ticket.tenPhim}</h2>
            <p className=" font-medium">Địa điểm : {seats.tenHeThongRap} </p>
            <p className=" font-medium">Ngày đặt : {moment(ticket.ngayDat).format('DD-MM-YYYY')} - Giờ đặt : {moment(ticket.ngayDat).format('hh:mm: A')}  </p>
            <p className="font-medium">Tên Rap: {seats.tenRap}</p>
            <p className='text-red-400 '>Ghế: {ticket.danhSachGhe.map((ghe, index) => {
              return <Fragment key={index}>
                {index > 0 ? ',' : ''}   {ghe.tenGhe}
              </Fragment>
            })}</p>
          </div>
        </div>
      </div>
    })
  }
  useEffect(()=>{
    return ()=>{
      dispatch({
        type: CHANGE_TAB_ACTIVE,
        number: '1'
      })
    }
  },[])

  return (
    <div className={`${style.header_checkout} header_checkout`}>
      <Tabs className={` mb-0 mr-20 ${style.header}`} defaultActiveKey='1' activeKey={tabActive}  onChange={(key) => {
        dispatch({
          type: CHANGE_TAB_ACTIVE,
          number: key
        })
      }} >
         <Tabs.TabPane className={'home'}  tab={<HomeOutlined className={`${style.home_icon}`} style={{fontSize:25}} onClick={()=>{
          history.push('/home')
        }}/>}  key='3'>
        </Tabs.TabPane>
        <Tabs.TabPane tab={<h2 className='text-lg font-semibold'>01 CHỌN GHẾ & THANH TOÁN</h2>} key={'1'}>
          <Checkout {...props} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<h2 className='text-lg font-semibold'>02 KẾT QUẢ ĐẶT VÉ</h2>} key={'2'}>
          <div>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-900">Thông tin đặt vé của bạn</h1>
                  <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem lại thông tin đặt vé của bạn nhé !</p>
                </div>
                <div className="flex flex-wrap -m-2">
                  {renderTicketItem()}
                </div>
              </div>
            </section>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

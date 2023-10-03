import { CustomCard } from '@tsamantanis/react-glassmorphism'
import { Button, Form, Input, Select, Table, Tabs } from 'antd'
import React, { Fragment, useEffect } from 'react'
import _ from 'lodash'
import './Profile.css'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { capNhatThongTinNguoiDungAction, layDanhSachLoaiNguoiDung, layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { useFormik } from 'formik';
import { GROUPID, USER_LOGIN } from '../../utils/Setting/config';
function Profile() {
    const { thongTinNguoiDung, danhSachLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    const maLoaiNguoiDung = JSON.parse(localStorage.getItem(USER_LOGIN))?.maLoaiNguoiDung
    console.log(maLoaiNguoiDung)
    console.log(thongTinNguoiDung)
    useEffect(() => {
        dispatch(layThongTinNguoiDungAction());
        dispatch(layDanhSachLoaiNguoiDung());
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung.taiKhoan,
            email: thongTinNguoiDung.email,
            soDt: thongTinNguoiDung.soDT,
            hoTen: thongTinNguoiDung.hoTen,
            maLoaiNguoiDung: maLoaiNguoiDung,
            matKhau: thongTinNguoiDung.matKhau,
            maNhom: GROUPID
        },
        onSubmit: (value) => {
            console.log(value)
            dispatch(capNhatThongTinNguoiDungAction(value))
        }
    })

    const handleChangeSelect = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value);
    }
    return (
        <div className=' justify-center items-center flex profile'>
            <Form className='form-profile' style={{ width: '50%', background: '#fff', padding: 15, borderRadius: 10 }} labelCol={{
                span: 4,
            }}
                onSubmitCapture={formik.handleSubmit}
            >
                <h3 className='text-2xl text-center font-black'>Thông tin cá nhân</h3>
                <Form.Item label='Tài khoản'>
                    <Input name='taiKhoan' value={formik.values.taiKhoan} disabled={true} />
                </Form.Item>
                <Form.Item label='Email'>
                    <Input name='email' value={formik.values.email} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label='Số điện thoại'>
                    <Input name='soDt' value={formik.values.soDt} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label='Họ tên'>
                    <Input name='hoTen' value={formik.values.hoTen} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label='Mật khẩu'>
                    <Input name='matKhau' value={formik.values.matKhau} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label='Tác vụ'>
                    <Button className='update ' htmlType='submit'>Cập nhật</Button>
                </Form.Item>
            </Form>
        </div>
    )
}



export default function DemoProfile() {
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { tabActive } = useSelector(state => state.ThongTinPhongVeReducer)
    const dispatch = useDispatch()
    console.log(thongTinNguoiDung)
    useEffect(() => {
        dispatch(layThongTinNguoiDungAction())
    }, [])

    const renderTicketItem = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe)
            return <div key={index} className="p-2  lg:w-1/3 md:w-1/2 w-full h-full ">
                <div className="h-full flex items-center bg-white rounded-lg border-gray-200 border p-4 rounded-lg">
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
    return (
        <div className='profile-parent' style={{ backgroundImage: 'url(/img/profile.jpg)', height: '100%', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'none' }}>
            <CustomCard style={{ minHeight: '100vh', paddingTop: '100px' }}
                effectColor="##fff"
                color="#fff"
                blur={3}
                borderRadius={0}>
                <Tabs defaultActiveKey='1'>
                    <Tabs.TabPane tab={<p className='text-lg font-semibold text-white'>Thông tin cá nhân</p>} key={1}>
                        <Profile />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<p className='text-lg font-semibold text-white'>Lịch sử đặt vé</p>} key={2}>
                        <div>
                            <section className="text-gray-600 body-font">
                                <div className="container px-5  mx-auto">
                                    <div className="flex flex-col text-center w-full mb-20">
                                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4  text-teal-400">Thông tin đặt vé của bạn</h1>
                                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-cyan-500">Hãy xem lại thông tin đặt vé của bạn nhé !</p>
                                    </div>
                                    <div className="flex flex-wrap -m-2">
                                        {renderTicketItem()}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </CustomCard>
        </div>
    )
}
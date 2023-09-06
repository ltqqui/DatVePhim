import { useFormik } from 'formik';
import React from 'react'
import {useDispatch} from 'react-redux'
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';
import {NavLink} from 'react-router-dom'
export default function Register() {
  const dispatch=useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan:'',
      matKhau: '',
      email:'',
      soDT:'',
      maNhom:'',
      hoTen:''
    },
    onSubmit: values => {
        dispatch(dangKyAction(values))
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm h-full">
      <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <div>
          </div>
          <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
            <img src="./img/logo.png" alt="" />
          </div>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
  xl:text-bold">Đăng ký</h2>
        <div className="mt-12">
          <div>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
              <input onChange={formik.handleChange} name='taiKhoan' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Nhập tài khoản" />
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Mật khẩu
                </div>
              </div>
              <input onChange={formik.handleChange} name='matKhau' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='password' placeholder="Nhập mật khẩu" />
            </div>
            <div className='mt-8'>
              <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
              <input onChange={formik.handleChange} name='email' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Nhập email" />
            </div>
            <div className='mt-8'>
              <div className="text-sm font-bold text-gray-700 tracking-wide">Số điện thoại</div>
              <input onChange={formik.handleChange} name='soDT' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Nhập số điện thoại" />
            </div>
            <div className='mt-8'>
              <div className="text-sm font-bold text-gray-700 tracking-wide">Họ tên</div>
              <input onChange={formik.handleChange} name='hoTen' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Nhập họ tên" />
            </div>
            <div className="mt-10">
              <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
              font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
              shadow-lg">
                Đăng ký
              </button>
            </div>
          </div>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center mb-10">
            <NavLink  to='/login' className="cursor-pointer text-indigo-600 hover:text-indigo-800 ">Đăng nhập</NavLink>
          </div>
        </div>
      </div>
    </form>
  )
}

import { useFormik } from 'formik';
import React from 'react'
import {useDispatch} from 'react-redux'
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';
import {NavLink} from 'react-router-dom'
import styleRegister from './Register.css'
import { history } from '../../App';
import { GROUPID } from '../../utils/Setting/config';
export default function Register() {
  const dispatch=useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan:'',
      matKhau: '',
      email:'',
      soDT:'',
      maNhom:GROUPID,
      hoTen:''
    },
    onSubmit: values => {
        dispatch(dangKyAction(values))
    },
  });
  return (
    
    <div className={`login flex justify-center items-center ${styleRegister.Login}`} style={{position:'absolute', zIndex:5, width:'100%', height:'100%'}}>
      <form onSubmit={formik.handleSubmit} action="" className=' rounded-lg ' style={{ background:'transparent',width:'30%',height:'70%', padding:' 2% 3%', border:'2px solid rgba(255,255,255,0.2)', backdropFilter:`blur(5px)`, boxShadow:'0px 0px 10px rgba(255,255,255,.2)'  }} >
        <h3 className='text-center text-3xl font-bold text-white mb-5  '>Đăng ký</h3>
        <div className='mb-5' >
            <input onChange={formik.handleChange} name='taiKhoan' type="text" style={{height:'40px', border:'1px solid #fff', outline:'none',width:'100%',borderRadius:'15px', padding:'0 10px', background:'transparent', color:'#fff',placeholder:`color:'red'`  }}  placeholder='Tên đăng nhập' />
        </div>
        <div className='mb-5'>
            <input type="password" placeholder='Mật khẩu'onChange={formik.handleChange} name='matKhau' style={{height:'40px', border:'1px solid #fff', outline:'none',width:'100%',borderRadius:'15px', padding:'0 10px', background:'transparent', color:'#fff',placeholder:`color:'red'`  }} />
        </div>
        <div className='mb-5'>
            <input type="text" placeholder='Email'onChange={formik.handleChange} name='email' style={{height:'40px', border:'1px solid #fff', outline:'none',width:'100%',borderRadius:'15px', padding:'0 10px', background:'transparent', color:'#fff',placeholder:`color:'red'`  }} />
        </div>
        <div className='mb-5'>
            <input type="text" placeholder='Số điện thọai'onChange={formik.handleChange} name='soDT' style={{height:'40px', border:'1px solid #fff', outline:'none',width:'100%',borderRadius:'15px', padding:'0 10px', background:'transparent', color:'#fff',placeholder:`color:'red'`  }} />
        </div>
        <div className='mb-10'>
            <input type="text" placeholder='Họ tên'onChange={formik.handleChange} name='hoTen' style={{height:'40px', border:'1px solid #fff', outline:'none',width:'100%',borderRadius:'15px', padding:'0 10px', background:'transparent', color:'#fff',placeholder:`color:'red'`  }} />
        </div>
        <div className='mb-4'>
            <button  style={{background:'#fff', width:'100%', padding:'10px', borderRadius:'15px', fontWeight:'600', fontSize:'16px'}}>Đăng ký</button>
        </div>
        <div className='mb-4'>
          <p className='text-center text-white'>Bạn đã có tài khoản ? <NavLink  onClick={()=>{
            // history.push('/login')
          }}  to='/login' className='text-white font-medium'>Đăng nhập</NavLink></p>
        </div>
      </form>
    </div>
  //   <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm h-full">
  //     <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
  //       <div className="cursor-pointer flex items-center">
  //         <div>
  //         </div>
  //         <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
  //           <img src="./img/logo.png" alt="" />
  //         </div>
  //       </div>
  //     </div>
  //     <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
  //       <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
  // xl:text-bold">Đăng ký</h2>
  //       <div className="mt-12">
  //         <div>
  //           <div>
  //             <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
  //             <input onChange={formik.handleChange} name='taiKhoan' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Nhập tài khoản" />
  //           </div>
  //           <div className="mt-8">
  //             <div className="flex justify-between items-center">
  //               <div className="text-sm font-bold text-gray-700 tracking-wide">
  //                 Mật khẩu
  //               </div>
  //             </div>
  //             <input onChange={formik.handleChange} name='matKhau' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='password' placeholder="Nhập mật khẩu" />
  //           </div>
  //           <div className='mt-8'>
  //             <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
  //             <input onChange={formik.handleChange} name='email' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Nhập email" />
  //           </div>
  //           <div className='mt-8'>
  //             <div className="text-sm font-bold text-gray-700 tracking-wide">Số điện thoại</div>
  //             <input onChange={formik.handleChange} name='soDT' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Nhập số điện thoại" />
  //           </div>
  //           <div className='mt-8'>
  //             <div className="text-sm font-bold text-gray-700 tracking-wide">Họ tên</div>
  //             <input onChange={formik.handleChange} name='hoTen' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Nhập họ tên" />
  //           </div>
  //           <div className="mt-10">
  //             <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
  //             font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
  //             shadow-lg">
  //               Đăng ký
  //             </button>
  //           </div>
  //         </div>
  //         <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center mb-10">
  //           <NavLink  to='/login' className="cursor-pointer text-indigo-600 hover:text-indigo-800 ">Đăng nhập</NavLink>
  //         </div>
  //       </div>
  //     </div>
  //   </form>
  )
}

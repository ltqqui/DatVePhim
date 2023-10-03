import React from 'react'
import {useFormik} from 'formik'
import {useSelector, dispatch, useDispatch} from 'react-redux'
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import './Login.css'
import {NavLink} from 'react-router-dom'
import { history } from '../../App';
import styleLogin from './Login.css'
export default function Login() {
  console.log(history)
  const{userLogin}=useSelector(state=>state.QuanLyNguoiDungReducer);
  const dispatch=useDispatch();
  console.log(userLogin)
   const formik = useFormik({
     initialValues: {
       taiKhoan:'',
       matKhau: '',
     },
     onSubmit: values => {
       dispatch(dangNhapAction(values))
     },
   });
  
  return (
    

    <div className={`login flex justify-center items-center ${styleLogin.Login}`} style={{position:'absolute', zIndex:5, width:'100%', height:'100%'}}>
      <form onSubmit={formik.handleSubmit} action="" className=' rounded-lg ' style={{ background:'transparent',width:'30%',height:'50%', padding:' 2% 3%', border:'2px solid rgba(255,255,255,0.2)', backdropFilter:`blur(5px)`, boxShadow:'0px 0px 10px rgba(255,255,255,.2)'  }} >
        <h3 className='text-center text-3xl font-bold text-white mb-5  '>Đăng nhập</h3>
        <div className='mb-5' >
            <input onChange={formik.handleChange} name='taiKhoan' type="text" style={{height:'40px', border:'1px solid #fff', outline:'none',width:'100%',borderRadius:'15px', padding:'0 10px', background:'transparent', color:'#fff',placeholder:`color:'red'`  }}  placeholder='Tên đăng nhập' />
        </div>
        <div className='mb-5'>
            <input type="password" placeholder='Mật khẩu'onChange={formik.handleChange} name='matKhau' style={{height:'40px', border:'1px solid #fff', outline:'none',width:'100%',borderRadius:'15px', padding:'0 10px', background:'transparent', color:'#fff',placeholder:`color:'red'`  }} />
        </div>
        <div className='mb-4'>
          <p className='text-white text-right'>Quên mật khẩu ? </p>
        </div>
        <div className='mb-4'>
            <button style={{background:'#fff', width:'100%', padding:'10px', borderRadius:'15px', fontWeight:'600', fontSize:'16px'}}>Đăng nhập</button>
        </div>
        <div className='mb-4'>
          <p className='text-center text-white'>Chưa có tài khoản ? <NavLink to='/register' onClick={()=>{
            history.push('/register')
          }} className='text-white font-medium'>Đăng ký</NavLink></p>
        </div>
      </form>
    </div>
  //   <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm h-screen">
  //     <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
  //       <div className="cursor-pointer flex items-center">
  //         <div>
  //           <svg className="w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 225 225" style={{ enableBackground: 'new 0 0 225 225' }} xmlSpace="preserve">
  //             <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                " }} />
  //             <g transform="matrix( 1, 0, 0, 1, 0,0) ">
  //               <g>
  //                 <path id="Layer0_0_1_STROKES" className="st0" d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8" />
  //               </g>
  //             </g>
  //           </svg>
  //         </div>
  //         <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">blockify</div>
  //       </div>
  //     </div>
  //     <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
  //       <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
  // xl:text-bold">Đăng nhập</h2>
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
  //               <div>
  //                 <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
  //                     cursor-pointer">
  //                   Quên mật khẩu ? 
  //                 </a>
  //               </div>
  //             </div>
  //             <input onChange={formik.handleChange} name='matKhau' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='password' placeholder="Nhập mật khẩu" />
  //           </div>
  //           <div className="mt-10">
  //             <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
  //             font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
  //             shadow-lg">
  //               Đăng ký
  //             </button>
  //           </div>
  //         </div>
  //         <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
  //           Không có tài khoản ?  <NavLink  to='/register' className="cursor-pointer text-indigo-600 hover:text-indigo-800 ">Đăng Ký</NavLink>
  //         </div>
  //       </div>
  //     </div>
  //   </form>
  )
}

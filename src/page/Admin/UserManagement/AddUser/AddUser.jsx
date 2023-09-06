import { Form, Input, Select } from 'antd'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GROUPID } from '../../../../utils/Setting/config'
import { layDanhSachLoaiNguoiDung, themNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction'

export default function AddUser() {
  const {danhSachLoaiNguoiDung}=useSelector(state => state.QuanLyNguoiDungReducer);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(layDanhSachLoaiNguoiDung())
  },[])
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: GROUPID,
      maLoaiNguoiDung: '',
      hoTen: ''
    },
    onSubmit:(values)=>{
      console.log(values)
      dispatch(themNguoiDungAction(values))
    }
  })
  const handleChangeMaNguoiDung = (value) => {
    formik.setFieldValue('maLoaiNguoiDung', value)
  }
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 className='text-xl'>Thêm người dùng</h3>
      <Form.Item label="Tài khoản">
        <Input name='taiKhoan' onChange={formik.handleChange}  />
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input name='matKhau' onChange={formik.handleChange}  />
      </Form.Item>
      <Form.Item label="Họ tên">
        <Input name='hoTen' onChange={formik.handleChange}  />
      </Form.Item>
      <Form.Item label="Email">
        <Input name='email' onChange={formik.handleChange}  />
      </Form.Item>
      <Form.Item label="Số điện thoại">
        <Input name='soDt' onChange={formik.handleChange}  />
      </Form.Item>
      <Form.Item label="Mã loại người dùng">
        <Select onChange={handleChangeMaNguoiDung} options={danhSachLoaiNguoiDung.map((item,index)=>({label:item.tenLoai, value:item.maLoaiNguoiDung}))} />
      </Form.Item>
      <Form.Item label='Tác vụ'>
        <button type='submit' className='bg-blue-500 p-2 rounded-sm text-white' onClick={() => {
        }}>Thêm người dùng </button>
      </Form.Item>
    </Form>
  )
}

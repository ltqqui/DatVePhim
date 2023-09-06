import { Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { EDIT_NGUOI_DUNG } from '../../../../redux/type/UserType';
import { capNhatThongTinNguoiDungAdminAction, layDanhSachLoaiNguoiDung, layDanhSachNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { useFormik } from 'formik';
import { formToJSON } from 'axios';
import { GROUPID } from '../../../../utils/Setting/config';
export default function EditUser(props) {
  const { nguoiDungEdit, danhSachNguoiDungDefault, danhSachLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
  console.log(nguoiDungEdit);
  const dispatch = useDispatch();
  useEffect(() => {
    async function edit() {
      await dispatch(layDanhSachLoaiNguoiDung())
      await dispatch(layDanhSachNguoiDungAction());
      await dispatch({
        type: EDIT_NGUOI_DUNG,
        taiKhoan: props.match.params.account
      })
    }
    edit()
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: nguoiDungEdit.taiKhoan,
      matKhau: nguoiDungEdit.matKhau,
      email: nguoiDungEdit.email,
      soDt:nguoiDungEdit.soDt,
      maNhom:GROUPID,
      maLoaiNguoiDung: nguoiDungEdit.maLoaiNguoiDung,
      hoTen: nguoiDungEdit.hoTen,
    },
    onSubmit: (values) => {
      dispatch(capNhatThongTinNguoiDungAdminAction(values))
    }
  })
  const handleChangeLoaiNguoiDung = (value) => {
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
      onSubmitCapture={formik.handleSubmit}
      layout="horizontal"
      initialValues={{
      }}
    >
      <h3 className='text-xl'>Cập nhật người dùng</h3>
      <Form.Item label="Tài khoản">
        <Input name='taiKhoan' onChange={formik.handleChange} value={formik.values.taiKhoan} disabled={true} />
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input name='matKhau' onChange={formik.handleChange} value={formik.values.matKhau} />
      </Form.Item>
      <Form.Item label="Họ tên">
        <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} />
      </Form.Item>
      <Form.Item label="Email">
        <Input name='email' onChange={formik.handleChange} value={formik.values.email} />
      </Form.Item>
      <Form.Item label="Số điện thoại">
        <Input name='soDt' value={formik.values.soDt} onChange={formik.handleChange}  />
      </Form.Item>
      <Form.Item label="Mã loại người dùng">
        <Select onChange={handleChangeLoaiNguoiDung} value={formik.values.maLoaiNguoiDung} options={danhSachLoaiNguoiDung.map((item, index) => ({ label: item.tenLoai, value: item.maLoaiNguoiDung }))} />
      </Form.Item>
      <Form.Item label='Tác vụ'>
        <button type='submit' className='bg-blue-500 p-2 rounded-sm text-white' onClick={() => {
        }}>Cập nhật người dùng </button>
      </Form.Item>
    </Form>
  )
}

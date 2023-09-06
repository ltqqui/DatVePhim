/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Form, Button, Input, Select, DatePicker, InputNumber } from 'antd'
import { quanLyRapPhim } from '../../../services/QuanLyRapPhimServices'
import { STATUS_CODE } from '../../../services/settingSystem'
import { useFormik } from 'formik'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { taoLichChieuAction } from '../../../redux/actions/ThongTinPhongVeAction'
export default function Showtime(props) {
  const [state, setState]=useState({
    heThongRap:[],
    cumRap:[]
  })
  const dispatch=useDispatch();

    const formik=useFormik({
      initialValues:{
        maPhim:props.match.params.id,
        ngayChieuGioChieu:'',
        maRap:'',
        giaVe:0
      },
      onSubmit:(value)=>{
        dispatch(taoLichChieuAction(value))
        console.log(value)
      }
    })
  const handleChangeHeThongRap= async (value)=>{
      try {
          const {data, status }= await quanLyRapPhim.layThongTinCumRap(value);
          if(status===STATUS_CODE.SUCCESS){
            setState({
              ...state,
              cumRap:data.content
            })
          }
      } catch (error) {
        
      }
  }

  const handleChangeCumRap =(value)=>{
      formik.setFieldValue('maRap', value)
  }

  const onOk=(value)=>{
      formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'));
  }

  const handleChangeInputNumber=(value)=>{
      formik.setFieldValue('giaVe', value)
  }

  useEffect(()=>{
      async function layThongTinHeThongRapAction (){
        try {
          const {data, status}= await quanLyRapPhim.layThongTinHeThongRap();
          if(status===STATUS_CODE.SUCCESS){
            setState({
              ...state,
              heThongRap:data.content
            })
          }
        } catch (error) {
         console.log(error.response?.data) 
        }
      }
      layThongTinHeThongRapAction()
  },[])
  return (
    <div className='container'>
      <h3 className='text-xl'>Tạo lịch chiếu</h3>
      <Form name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onSubmitCapture={formik.handleSubmit} 
        >
        <Form.Item label='Hệ thống rạp'>
          <Select placeholder='Chọn hệ thống rạp' onChange={handleChangeHeThongRap} options={state.heThongRap?.map((htr,index)=>({label:htr.tenHeThongRap, value:htr.maHeThongRap}))} />
        </Form.Item>
        <Form.Item label='Cụm rạp'>
          <Select placeholder='Chọn cụm rạp' onChange={handleChangeCumRap} options={state.cumRap?.map((cr, index)=>({label:cr.tenCumRap, value:cr.maCumRap}))} />
        </Form.Item>
        <Form.Item label='Ngày chiếu giờ chiếu'>
        <DatePicker format={'DD/MM/YYYY hh:mm:ss'}  showTime onOk={onOk}  />
        </Form.Item>
        <Form.Item label='Giá vé'>
          <InputNumber placeholder='Giá vé' onChange={handleChangeInputNumber}  />
        </Form.Item>
        <Form.Item label='Tác vụ '>
          <Button htmlType='submit'>Tạo lịch chiếu</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

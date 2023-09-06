import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import {useDispatch} from 'react-redux'
import React, { useState } from 'react';
import { themUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../utils/Setting/config';
export default function AddNew() {
  const [componentSize, setComponentSize] = useState('default');
  const [srcImg, setSrcImg] = useState('');
  const dispatch=useDispatch()
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      maNhom:GROUPID,
      hinhAnh: {}
    },
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
        }
        else{
          formData.append('File',values.hinhAnh, values.hinhAnh.name)
        }
      }
      // console.log(values)
      dispatch(themUploadHinhAction(formData))
    }
  })

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
  }

  const handleChangeSwitch = (name) => {
    return value => {
      formik.setFieldValue(name, value)
    }
  }

  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/jpeg') {
      //tạo ra một tối tượng để độc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setSrcImg(event.target.result)
      }
      //đem dữ liệu lưu vào formik
      formik.setFieldValue('hinhAnh', file)
    }

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
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h3>Thêm mới phim</h3>
      <Form.Item label="Tên phim">
        <Input name='tenPhim' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name='trailer' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name='moTa' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker onChange={handleChangeDatePicker} format={'DD/MM/YYYY'} />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('dangChieu')} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('sapChieu')} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('hot')} />
      </Form.Item>
      <Form.Item label="Đánh giá">
        <InputNumber onChange={handleChangeSwitch('danhGia')} min={0} max={10} />
      </Form.Item>
      <Form.Item label="Hình ảnh" >
        <input type="file" onChange={handleChangeFile} accept='image/png, image/gif , image/jpg, image/jpeg' />
        <img src={srcImg} style={{ width: 150, height: 200, border: '1px solid', marginTop: 10 }} alt="..." />
      </Form.Item>
      <Form.Item label='Tác vụ'>
        <button type='submit' className='bg-blue-500 p-2 rounded-sm text-white' onClick={() => {
          formik.handleSubmit()
        }}>Thêm phim </button>
      </Form.Item>
    </Form>
  );
};
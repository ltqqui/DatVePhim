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
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { capNhatPhimUploadAction, layThongTinPhimAction, themUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../utils/Setting/config'


export default function Edit(props) {
  const [componentSize, setComponentSize] = useState('default');
  const [srcImg, setSrcImg] = useState('');
  const dispatch = useDispatch()
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
  console.log(thongTinPhim)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim.maPhim,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      maNhom: GROUPID,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      hinhAnh: null
    },
    onSubmit: (values) => {
      let formData = new FormData();
      values.maNhom = GROUPID;
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
        }
        else {
          if (formik.values.hinhAnh !== null) {
            formData.append('File', values.hinhAnh, values.hinhAnh.name)
          }
        }
      }
      dispatch(capNhatPhimUploadAction(formData))
    }
  })

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value)
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
  }

  const handleChangeSwitch = (name) => {
    return value => {
      formik.setFieldValue(name, value)
    }
  }
  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    //đem dữ liệu lưu vào formik
    await formik.setFieldValue('hinhAnh', file)

    if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/jpeg') {
      //tạo ra một tối tượng để độc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setSrcImg(event.target.result)
      }
    }
  }
  // console.log(props.match.params.id);
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinPhimAction(id))
  }, [])


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
      <h3>Chỉnh sửa phim</h3>
      <Form.Item label="Tên phim">
        <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker onChange={handleChangeDatePicker} format="DD/MM/YYYY" value={moment(formik.values.ngayKhoiChieu)} />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
      </Form.Item>
      <Form.Item label="Đánh giá">
        <InputNumber onChange={handleChangeSwitch('danhGia')} min={0} max={10} value={formik.values.danhGia} />
      </Form.Item>
      <Form.Item label="Hình ảnh" >
        <input type="file" onChange={handleChangeFile} accept='image/png, image/gif , image/jpg, image/jpeg' />
        <img src={srcImg === '' ? thongTinPhim.hinhAnh : srcImg} style={{ width: 150, height: 200, border: '1px solid', marginTop: 10 }} alt="..." />
      </Form.Item>
      <Form.Item label='Tác vụ'>
        <button type='submit' className='bg-blue-500 p-2 rounded-sm text-white' onClick={() => {
          formik.handleSubmit()
        }}>Chỉnh sửa phim </button>
      </Form.Item>
    </Form>
  );
};
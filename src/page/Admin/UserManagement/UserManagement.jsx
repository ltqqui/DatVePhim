import React, { Fragment, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { Button, Input, Popconfirm, Space, Table } from 'antd';
import { NavLink } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { history } from '../../../App';
import { xoaNguoiDungAction, xoaNguoiDungAdminAction } from '../../../redux/reducer/QuanLyNguoiDungReducer';
const { Search } = Input
export default function UserManagement() {
  const dispatch = useDispatch();
  const searchRef=useRef('')
  const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction())
  }, [])
  const onSearch = (value) => {
    if(searchRef.current){
      clearTimeout(searchRef.current)
  }
  searchRef.current=setTimeout(()=>{
    dispatch(layDanhSachNguoiDungAction(value))
  },1000)
  }

  const handleChange = () => {

  }
  const columns = [
    {
      title: 'Tài khoản ',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      sorter: (a, b) => {
        let taiKhoan1 = a.taiKhoan.trim().toLowerCase();
        let taiKhoan2 = b.taiKhoan.trim().toLowerCase();
        if (taiKhoan1 < taiKhoan2) {
          return 1;
        }
        return -1;
      },
      width: '20%'
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matKhau',
      key: 'matKhau',
      width: '20%'
    },

    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      sorter: (a, b) => {
        let ten1 = a.hoTen.trim().toLowerCase();
        let ten2 = b.hoTen.trim().toLowerCase();
        if (ten1 < ten2) {
          return 1;
        }
        return -1;
      },
      width: '20%'
    },
    {
      title: 'Email ',
      dataIndex: 'email',
      key: 'email',
      width: '20%'
    }, {
      title: 'Loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
      width: '10%'
    },
    {
      title: 'Thao tác',
      dataIndex: 'thaoTac',
      render: (text, record, index) => {
        return <Fragment key={index}>
          <NavLink style={{ marginRight: 15, marginLeft: 10, color: 'blue', fontSize: 20 }} to={`/admin/user/edituser/${record.taiKhoan}`} ><EditOutlined /></NavLink>
          <Popconfirm
            placement="topRight"
            title={`Bạn có muốn xóa ${record.tenPhim}`}
            onConfirm={() => {
              dispatch(xoaNguoiDungAdminAction(record.taiKhoan))
            }}
            okText="Yes"
            cancelText="No"
          > <span style={{ color: 'red', fontSize: 20, cursor: 'pointer' }}  ><DeleteOutlined /></span>
          </Popconfirm>
        </Fragment>
      },
      width: '10%'
    }
  ]
  return (
    <>
      <Button style={{ color: 'green' }} onClick={() => {
        history.push('/admin/user/adduser')
      }}>Thêm người dùng</Button>
      <Search className='my-5' placeholder="input search text" onChange={(e) => {
        onSearch(e.target.value)
      }} enterButton />
      <Space
        style={{
          marginBottom: 16,
        }}
      >
      </Space>
      <Table columns={columns} rowKey={(record) => {
        return record.taiKhoan
      }} dataSource={danhSachNguoiDung} onChange={handleChange} />
    </>
  )
}

import { Button, Space, Table, Input, Popconfirm } from 'antd';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getFilm, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { CalendarOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { history } from '../../../App';
const { Search } = Input;
export default function Films() {
    const dispatch = useDispatch();
    const searchRef=useRef(null);
    useEffect(() => {
        dispatch(getFilm())
    }, [])
    const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        // setFilteredInfo(filters);
        // setSortedInfo(sorter);
    }

    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            key: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            width: '15%'
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            key: 'hinhAnh',
            render: (text, record, index) => {
                return <Fragment>
                    <img src={record.hinhAnh} width={50} height={50} alt="" onError={(e) => {
                        e.target.onError = null;
                        e.target.src = `https://picsum.photos/id/${index}/200`
                    }} />
                </Fragment>
            },
            width: '15%'
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            key: 'tenPhim',
            sorter: (a, b) => {
                let tenPhim1 = a.tenPhim.trim().toLowerCase();
                let tenPhim2 = b.tenPhim.trim().toLowerCase();
                if (tenPhim2 < tenPhim1) {
                    return 1;
                }
                return -1;
            },
            width: '25%'
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            key: 'moTa',
            render: (text, record, index) => {
                return <Fragment>
                    {text.length > 70 ? `${text.slice(0, 70)} ...` : text}
                </Fragment>
            },
            width: '25%'
        },
        {
            title: 'Thao tác',
            dataIndex: 'thaoTac',
            key: 'thaoTac',
            render: (text, record, index) => {
                return <Fragment>
                    <NavLink style={{ marginRight: 15, marginLeft: 10, color: 'blue', fontSize: 20 }} to={`/admin/films/edit/${record.maPhim}`} ><EditOutlined /></NavLink>
                    <Popconfirm
                        placement="topRight"
                        title={`Bạn có muốn xóa ${record.tenPhim}`}
                        onConfirm={() => {
                            dispatch(xoaPhimAction(record.maPhim))
                        }}
                        okText="Yes"
                        cancelText="No"
                    > <span style={{ color: 'red', fontSize: 20, cursor: 'pointer' }}  ><DeleteOutlined /></span>
                    </Popconfirm>
                    <NavLink style={{ marginRight: 15, marginLeft: 15, color: 'blue', fontSize: 20 }} to={`/admin/films/showtime/${record.maPhim}`}><CalendarOutlined/></NavLink>
                </Fragment>
            },
            width: '20%'
        }
    ];
    const onSearch = (value) =>{
        if(searchRef.current){
            clearTimeout(searchRef.current)
        }
        searchRef.current=setTimeout(()=>{
                dispatch(getFilm(value))
        },1000)
    }
    return (
        <>
            <Button style={{ color: 'green' }} onClick={() => {
                history.push('/admin/films/addnew');
            }}>Thêm phim</Button>
            <Search className='my-5' placeholder="input search text" onChange={(e)=>{
                onSearch(e.target.value)
            }} enterButton />
            <Space
                style={{
                    marginBottom: 16,
                }}
            >
            </Space>
            <Table columns={columns} rowKey={(record) => {
                return record.maPhim
            }} dataSource={arrFilmDefault} onChange={handleChange} />
        </>
    );
};
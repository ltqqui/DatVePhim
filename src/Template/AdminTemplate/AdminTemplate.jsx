import React, { useEffect, useState } from 'react'
import {
    DesktopOutlined,
    FileOutlined,
    HomeOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button, Modal, Space } from 'antd';
import { NavLink } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './AdminTemplate.css'
import { useSelector } from 'react-redux'
import Avatar from 'antd/lib/avatar/avatar';
import { TOKEN, USER_LOGIN } from '../../utils/Setting/config';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { history } from '../../App';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem(<NavLink style={{ color: '#fff' }} to='/admin/films'>Film</NavLink>, '2', <DesktopOutlined />, [
        getItem(<NavLink to='/admin/films/addnew'>Add new</NavLink>, '4', ''),
        getItem(<NavLink to='/admin/films'> Films</NavLink>, '5', '')
    ]),
    getItem(<NavLink to='/admin/user'>User</NavLink>, '1', <UserOutlined />,[
        getItem(<NavLink to='/admin/user'>User management</NavLink>, '7', ''),
        getItem(<NavLink to='/admin/user/adduser'>Add new</NavLink>, '6', ''),
    ]),
];

const error = async () => {
    console.log(123)
    await Modal.error({
        title: 'Quyền truy cập ',
        content: 'Bạn không có quyền vào trang này !',
    });
    history.push('/')
};



export const AdminTemplate = (props) => {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { Component, ...restParams } = props
    const [collapsed, setCollapsed] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    if (!localStorage.getItem(USER_LOGIN) || userLogin.maLoaiNguoiDung !== 'QuanTri') {
        error();
        return;
    }
    return (
        <Route {...restParams} render={(propsRoute) => {
            return <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="logo m-3">
                        <img src="/img/logoTix.png"  width ={100} onClick={()=>{history.push('/home')}} alt="" />
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout className="site-layout">    
                    <Header
                        className="site-layout-background"
                        style={{display:'flex', justifyContent:'space-between'}}

                    >
                        <div style={{width:'20%'}}>
                            <button><HomeOutlined style={{fontSize:25}} className='hover:text-blue-500 transition duration-0 hover:duration-150 ' onClick={()=>{
                                history.push('/')
                            }} /></button>
                        </div>
                        <div style={{
                            width:'80%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            padding: 0,
                        }}>
                            <div >
                                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf', fontSize: 20 }}>{userLogin.taiKhoan?.slice(0, 1)}</Avatar>
                                <span className='ml-2 cursor-pointer' onClick={()=>{
                                    history.push('/profile');
                                }}>{userLogin?.taiKhoan}</span>
                            </div>
                            <button style={{ margin: '0 3%', color: 'orange' }} onClick={() => {
                                localStorage.removeItem(USER_LOGIN);
                                localStorage.removeItem(TOKEN);
                                history.push('/')
                                window.location.reload();
                            }} >Đăng xuât</button>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                        </Breadcrumb>
                        <div
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                minHeight: 360,
                            }}
                        >
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        }} />
    );
}

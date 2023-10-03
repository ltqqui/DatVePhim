import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Button, Select } from 'antd';
import { history } from '../../../../App';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import './Header.css'
import { TOKEN, USER_LOGIN } from '../../../../utils/Setting/config';
import { ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons';
export default function Header(props) {
    const { t, i18n } = useTranslation();
    const [openMenu, setOpenMenu] = useState(false);
    const [active, setActive] = useState('');
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const handleClick = (e) => {
        setActive(e.target.id)
    }
    // const handleChange = (value) => {
    //     i18n.changeLanguage(value)
    // };
    // const sendDataToParent = () => {
    //     props.sendDataToParent(''); // Gọi hàm từ props để truyền dữ liệu lên
    // };
    return (
        <header style={{ transition: 'ease-in-out .2s', zIndex: '100' }} className={!props.isScrolled ? '   p-6 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-50 transition-all' : 'p-4 bg-coolGray-100 text-coolGray-800 transition-all  bg-black text-white fixed w-full z-50'}>
            {openMenu ? <div className='menu-mobile1' style={{ position: 'absolute', height: '230px', display: 'none', width: '100%', top: '0px ', right: '0px ', background: 'black' }} >
                <div className='flex justify-center  mt-6 menu-item'>
                    {userLogin.hoTen ? <button className='bg-white text-black name-user' onClick={()=>{
                        history.push('/profile')
                    }}>{userLogin.hoTen}</button> : ''}
                </div>
                <div className='flex justify-center mt-5  menu-item'>
                    <button  onClick={() => {
                        history.push('/')
                        window.scrollTo(0, 0)
                        setOpenMenu(false)
                    }}>Trang chủ</button>
                </div>
                <div className='flex justify-center mt-2 menu-item'>
                    <button
                        onClick={async () => {
                            if (props.match.path === '/') {
                                // sendDataToParent()
                                props.scrollToNew()

                            }
                            else {
                                await history.push('/');
                                await props.scrollToNew()
                            }
                            setOpenMenu(false)
                        }}>Tin tức</button>
                </div>
                <div className='flex justify-center mt-2 menu-item'>
                    <button onClick={async () => {
                        if (props.match.path === '/') {
                            // sendDataToParent()
                            props.scrollToContact()

                        }
                        else {
                            await history.push('/');
                            await props.scrollToContact()
                        }
                        setOpenMenu(false)
                    }}>Liên hệ</button>
                </div>


                {userLogin.maLoaiNguoiDung === 'QuanTri' ? <div className='flex justify-center mt-2 menu-item'>
                    <button onClick={()=>{
                        history.push('/admin/films')
                    }}>Quản trị</button>
                </div> : ''}
                <div className='flex justify-center mt-2 menu-item'>
                    <button onClick={() => {
                        localStorage.removeItem(USER_LOGIN);
                        localStorage.removeItem(TOKEN)
                        history.push('')
                        window.location.reload()
                    }} className="">{t('Đăng xuất')}</button>
                </div>
            </div> : <div className='menu-mobile2' style={{ position: 'absolute', height: '230px', display: 'none', width: '100%', top: '0px ', right: '0px ', background: 'black', textAlign: 'left' }} ></div>}
            <div className="container flex justify-between h-16 mx-auto">
                <a rel="noopener noreferrer" aria-label="Back to homepage" href className="flex items-center p-2" style={{ width: '20%' }}>
                    <img src="/img/logoTix.png" style={!props.isScrolled ? { height: '65px', transition: 'all 0.3s' } : { height: '55px', transition: 'all 0.3s' }} alt="" onClick={() => {
                        history.push('/');
                        // window.scrollTo(0,0)
                    }} />
                </a>
                <ul className="items-stretc h hidden space-x-3 lg:flex" >

                    <li className="flex">
                        <button onClick={(e) => {
                            handleClick(e)
                            if (props.dataFromChild === '') {
                                // sendDataToParent()
                                history.push('/')
                                window.scrollTo(0, 0)
                            }
                            else {
                                history.push('/home')
                            }
                        }
                        } id='home' className={`flex items-center px-4 -mb-1 text-white ${active === 'home' ? 'border-b-2' : ''}  `} >{t('Trang chủ')}</button>
                    </li>
                    <li className="flex">
                        <button onClick={async (e) => {
                            if (props.match.path === '/') {
                                // sendDataToParent()
                                props.scrollToNew()
                                handleClick(e)
                            }
                            else {
                                await history.push('/');
                                await props.scrollToNew()
                                handleClick(e)
                            }
                        }} rel="noopener noreferrer" id='news' className={`flex items-center px-4 -mb-1    text-white ${active === 'news' ? 'border-b-2' : ''}  `} >{t('Tin tức')}</button>
                    </li>
                    <li className="flex">
                        <button rel="noopener noreferrer" onClick={async (e) => {
                            if (props.match.path === '/') {
                                // sendDataToParent()
                                props.scrollToContact()
                                handleClick(e)
                            }
                            else {
                                await history.push('/');
                                await props.scrollToContact()
                                handleClick(e)
                            }

                        }
                        } id='contact' className={`flex items-center px-4 -mb-1 text-white ${active === 'contact' ? 'border-b-2' : ''}  `} >{t('Liên hệ')}</button>
                    </li>
                    {userLogin.maLoaiNguoiDung === 'QuanTri' ? <li className="flex">
                        <button rel="noopener noreferrer" onClick={() => {
                            history.push('/admin/films')
                        }} className="flex items-center px-4 -mb-1 text-white" activeClassName='border-b-2 border-white'>{t('Quản trị')}</button>
                    </li> : ''}
                </ul>

                {userLogin.hoTen ? <div className="items-center flex-shrink-0 hidden lg:flex">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        {/* <Select
                            defaultValue="Languages"
                            style={{
                                width: 120,
                                background: '#000'
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'en',
                                    label: 'English',
                                },
                                {
                                    value: 'vi',
                                    label: 'VietNamese',
                                },
                                {
                                    value: 'chi',
                                    label: 'China',
                                }
                            ]}
                        /> */}
                    </div>
                    <button className="self-center mx-12 py-1 px-2 rounded-sm bg-white text-black " onClick={() => {
                        history.push('/profile')
                    }}>Chào, {userLogin.taiKhoan}</button>
                    <button onClick={() => {
                        localStorage.removeItem(USER_LOGIN);
                        localStorage.removeItem(TOKEN)
                        history.push('')
                        window.location.reload()
                    }} className="items-center flex-shrink-0 hidden lg:flex p-1 bg-orange-500 rounded-sm">{t('Đăng xuất')}</button>
                </div> : <div className="items-center flex-shrink-0 hidden lg:flex">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        {/* <Select
                            defaultValue="Languages"
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'en',
                                    label: 'English',
                                },
                                {
                                    value: 'vi',
                                    label: 'VietNamese',
                                }
                                {
                                    value: 'chi',
                                    label: 'China',
                                }
                            ]}
                        /> */}
                    </div>
                    <button className="self-center px-8 py-3 rounded" onClick={() => {
                        history.push('/login')
                    }}>{t('Đăng nhập')}</button>
                    <button onClick={() => {
                        history.push('/register')
                    }} className=" self-center px-8 py-3 rounded  px-8 py-3 rounded">{t('Đăng ký')}</button>
                </div>
                }
                {!openMenu ? <i className="fa-solid fa-bars lg:hidden z-50 menu-icon cursor-pointer " onClick={() => {
                    setOpenMenu(!openMenu)
                }} style={{ fontSize: '25px' }}></i> : <i className=" fa-solid fa-xmark lg:hidden z-50 menu-icon cursor-pointer " onClick={() => {
                    setOpenMenu(!openMenu)
                }} style={{ fontSize: '25px' }}></i>}
            </div>
        </header>

    )
}



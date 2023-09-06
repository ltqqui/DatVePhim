import React from 'react';
import { NavLink } from 'react-router-dom'
import { Select } from 'antd';
import { history } from '../../../../App';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import './Header.css'
import { TOKEN, USER_LOGIN } from '../../../../utils/Setting/config';
export default function Header() {
    const { t, i18n } = useTranslation();
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const handleChange = (value) => {
        i18n.changeLanguage(value)
    };
    return (
        <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="" />
                </a>
                <ul className="items-stretc h hidden space-x-3 lg:flex">

                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to='/home' className="flex items-center px-4 -mb-1  text-white" activeClassName='border-b-2 border-white'>{t('Home')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to='/contact' className="flex items-center px-4 -mb-1  text-white" activeClassName='border-b-2 border-white'>{t('Contact')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to='/news' className="flex items-center px-4 -mb-1 text-white" activeClassName='border-b-2 border-white'>{t('News')}</NavLink>
                    </li>
                    {userLogin.maLoaiNguoiDung==='QuanTri' ?    <li className="flex">
                        <NavLink rel="noopener noreferrer" to='/admin/films' className="flex items-center px-4 -mb-1 text-white" activeClassName='border-b-2 border-white'>{t('Admin')}</NavLink>
                    </li> :'' }
                </ul>

                {userLogin.hoTen ? <div className="items-center flex-shrink-0 hidden lg:flex">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <Select
                            defaultValue="Languages"
                            style={{
                                width: 120,
                                background:'#000'
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
                        />
                    </div>
                    <button className="self-center mx-12 py-1 px-2 rounded-sm bg-white text-black " onClick={() => {
                        history.push('/profile')
                    }}>{userLogin.taiKhoan}</button>
                    <button onClick={() => {
                        localStorage.removeItem(USER_LOGIN);
                        localStorage.removeItem(TOKEN)
                        window.location.reload()
                    }} className="items-center flex-shrink-0 hidden lg:flex p-1 bg-orange-500 rounded-sm">{t('Sign out')}</button>
                </div> : <div className="items-center flex-shrink-0 hidden lg:flex">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <Select
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
                                },
                                {
                                    value: 'chi',
                                    label: 'China',
                                }
                            ]}
                        />
                    </div>
                    <button className="self-center px-8 py-3 rounded" onClick={() => {
                        history.push('/login')
                    }}>{t('Sign in')}</button>
                    <button onClick={() => {
                        history.push('/register')
                    }} className="items-center flex-shrink-0 hidden lg:flex">{t('Sign up')}</button>
                </div>}
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}

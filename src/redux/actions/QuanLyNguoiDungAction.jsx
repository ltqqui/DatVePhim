import { history } from "../../App";
import { quanLyNguoiDungServices } from "../../services/QuanLyNguoiDungServices"
import { STATUS_CODE } from "../../services/settingSystem";
import { notificationFunction } from "../../utils/libs/Notification/Notification";
import { SET_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_USER_LOGIN } from "../type/UserType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const dangNhapAction = (thongTinDangNhap) => {
    return async dispatch => {
        try {
            const { data, status } = await quanLyNguoiDungServices.dangNhap(thongTinDangNhap);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_USER_LOGIN,
                    thongTinDangNhap: data.content
                })
                history.goBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const layThongTinNguoiDungAction = () => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const { data, status } = await quanLyNguoiDungServices.layThongTinNguoiDung();
            console.log(data)
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: data.content
                })
            }
        } catch (error) {
            await dispatch(hideLoadingAction)
            console.log(error)
        }
    }
}

export const dangKyAction = (thongTinDangKy) => {
    return async dispatch => {
        try {
            const { status, data } = await quanLyNguoiDungServices.dangKy(thongTinDangKy);
            if (status === STATUS_CODE.SUCCESS) {
                history.push('/login')
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
}



export const layDanhSachNguoiDungAction = (account = '') => {
    return async dispatch => {
        try {
            const { data, status } = await quanLyNguoiDungServices.layDanhSachNguoiDung(account);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: data.content
                })
            }
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}

export const layDanhSachLoaiNguoiDung = () => {
    return async dispatch => {
        try {
            const { data, status } = await quanLyNguoiDungServices.layDanhSachLoaiNguoiDung();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_DANH_SACH_LOAI_NGUOI_DUNG,
                    danhSachLoaiNguoiDung: data.content
                })
            }
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}

export const themNguoiDungAction = (thongTinNguoiDung) => {
    return async dispatch => {
        dispatch(displayLoadingAction);
        try {
            const { data, status } = await quanLyNguoiDungServices.themNguoiDung(thongTinNguoiDung);
            console.log(data)
            if (status === STATUS_CODE.SUCCESS) {
                history.push('/admin/user')
                notificationFunction('success', 'Thêm người dùng thành công !');
            }
            else {
                notificationFunction('error', 'Thêm người dùng thất bại !');
            }
            await dispatch(hideLoadingAction)
        } catch (error) {
            dispatch(hideLoadingAction)
            notificationFunction('error', 'Thêm người dùng thất bại !');
            console.log(error.response?.data)
        }
    }
}

export const capNhatThongTinNguoiDungAdminAction=(thongTinCapNhat)=>{
    return async dispatch=>{
        dispatch(displayLoadingAction)
        try {
            const {data, status}= await quanLyNguoiDungServices.capNhatThongTinNguoiDungAdmin(thongTinCapNhat);
            console.log(data);
            console.log(status)
            if(status===STATUS_CODE.SUCCESS){
                notificationFunction('success', 'Cập nhật người dùng thành công !');
                history.push('/admin/user');
            }
            else{
                notificationFunction('error', 'Cập nhật thông tin người dùng thất bại !');
            }
            dispatch(hideLoadingAction);
        } catch (error) {
            console.log(error.response?.data);
            dispatch(hideLoadingAction);
            notificationFunction('error', 'Cập nhật thông tin người dùng thất bại !');
        }
    }
}

export const capNhatThongTinNguoiDungAction=(thongTinCapNhat)=>{
    return async dispatch=>{
        dispatch(displayLoadingAction)
        try {
            const {data, status}= await quanLyNguoiDungServices.capNhatThongTinNguoiDung(thongTinCapNhat);
            console.log(data);
            console.log(status)
            if(status===STATUS_CODE.SUCCESS){
                notificationFunction('success', 'Cập nhật người dùng thành công !');
                await layThongTinNguoiDungAction()
            }
            else{
                notificationFunction('error', 'Cập nhật thông tin người dùng thất bại !');
            }
            dispatch(hideLoadingAction);
        } catch (error) {
            console.log(error.response?.data);
            dispatch(hideLoadingAction);
            notificationFunction('error', 'Cập nhật thông tin người dùng thất bại !');
        }
    }
}

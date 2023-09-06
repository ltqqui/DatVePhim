import { quanLyNguoiDungServices } from "../../services/QuanLyNguoiDungServices";
import { STATUS_CODE } from "../../services/settingSystem";
import { USER_LOGIN , TOKEN} from "../../utils/Setting/config";
import { notificationFunction } from "../../utils/libs/Notification/Notification";
import { displayLoadingAction, hideLoadingAction } from "../actions/LoadingAction";
import { EDIT_NGUOI_DUNG, SET_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_USER_LOGIN } from "../type/UserType";

let user={}
if(localStorage.getItem(USER_LOGIN)){
     user=JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefalt={
    userLogin:user,
    thongTinNguoiDung:[],
    danhSachNguoiDung:[],
    danhSachLoaiNguoiDung:[],
    danhSachNguoiDungDefault:[],
    nguoiDungEdit:{}
}

export const QuanLyNguoiDungReducer=(state=stateDefalt, action)=>{
    switch(action.type){
        case SET_USER_LOGIN:{
           const  {thongTinDangNhap}=action;
           localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap))
            localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
            return {...state, userLogin:thongTinDangNhap}
        }
        case SET_THONG_TIN_NGUOI_DUNG:{
            console.log(action.thongTinNguoiDung)
           
            return {...state, thongTinNguoiDung:action.thongTinNguoiDung}
        }
        case SET_DANH_SACH_NGUOI_DUNG:{
            state.danhSachNguoiDung=action.danhSachNguoiDung
            state.danhSachNguoiDungDefault=state.danhSachNguoiDung;
            return {...state};
        }
        case SET_DANH_SACH_LOAI_NGUOI_DUNG:{
            return {...state, danhSachLoaiNguoiDung:action.danhSachLoaiNguoiDung}
        }
        case EDIT_NGUOI_DUNG:{
            let nguoiDungUpdate={...state.nguoiDungEdit};
            nguoiDungUpdate=state.danhSachNguoiDungDefault.find(nd=> nd.taiKhoan===action.taiKhoan);
            state.nguoiDungEdit=nguoiDungUpdate;
            return {...state}
        }
        default : return {...state}
    }
}

export const xoaNguoiDungAdminAction =(taiKhoan)=>{
    return async dispatch=> {
        dispatch(displayLoadingAction)
        try {
            const {data, status}= await quanLyNguoiDungServices.xoaNguoiDungAdmin(taiKhoan);
            if(status===STATUS_CODE.SUCCESS){
                notificationFunction('success', 'Xóa người dùng thành công!');
            }
            else {
                notificationFunction('error', 'Xóa thành người dùng thất bại !');
            }
        dispatch(hideLoadingAction)
        } catch (error) {
            console.log(error);
        dispatch(hideLoadingAction)
        notificationFunction('error', 'Xóa người dùng thất bại !');
        }
    }
}
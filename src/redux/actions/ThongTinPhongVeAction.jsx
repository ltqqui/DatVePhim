import { history } from "../../App";
import { thongTinPhongVe } from "../../services/ThongTinPhongVeServices"
import { STATUS_CODE } from "../../services/settingSystem";
import { TOKEN } from "../../utils/Setting/config";
import { notificationFunction } from "../../utils/libs/Notification/Notification";
import { CHUYEN_TAB, CLEAR_GHE_DANG_DAT, SET_THONG_TIN_DAT_VE, SET_THONG_TIN_PHONG_VE } from "../type/ThongTinPhongVeType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { layThongTinNguoiDungAction } from "./QuanLyNguoiDungAction";

export const layThongTinPhongVeAction = (maPhong) => {
    return async dispatch => {
        dispatch(displayLoadingAction)
        try {
            const { data, status } = await thongTinPhongVe.layThongTinPhongVe(maPhong);
            console.log(data);
            if (status === STATUS_CODE.SUCCESS) {
                console.log(123)
                dispatch({
                    type: SET_THONG_TIN_PHONG_VE,
                    thongTinPhongVe: data.content
                })
            }
            dispatch(hideLoadingAction)
        }
         catch (error) {
            console.log(error)
        }
    }
}

export const datVeAction = (thongTinDatVe) => {
    return async dispatch => {
        dispatch(displayLoadingAction)
        try {
            const { data, status } = await thongTinPhongVe.datVe(thongTinDatVe);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_THONG_TIN_DAT_VE,
                    thongTinDatVe: data.content
                })
            }
            await dispatch({
                type: CLEAR_GHE_DANG_DAT
            })
            await dispatch(layThongTinPhongVeAction(thongTinDatVe.maLichChieu))
            await dispatch(hideLoadingAction)
            await dispatch({
                type:CHUYEN_TAB
            })
            await dispatch(layThongTinNguoiDungAction())
        } catch (error) {
            await dispatch(hideLoadingAction)
            console.log(error)
        }

    }
}


export const taoLichChieuAction =(thongTinLichChieu)=>{
    return async dispatch=>{
        dispatch(displayLoadingAction);
        try {
        const {data, status}= await thongTinPhongVe.taoLichChieu(thongTinLichChieu);
            if(status===STATUS_CODE.SUCCESS){
                notificationFunction('success', 'Tạo lịch chiếu thành công !');
                history.push('/admin/films')
            }
            else {
                 notificationFunction('error', 'Tạo lịch chiếu thất bại !');
            }
             dispatch(hideLoadingAction);
        } catch (error) {
            await dispatch(hideLoadingAction);
            notificationFunction ('error', 'Tạo lịch chiếu thất bại !');
            console.log(error.response?.data);
        }
    }
}

import { history } from "../../App";
import { quanLyPhimServices } from "../../services/QuanLyPhimServices"
import { STATUS_CODE } from "../../services/settingSystem";
import { notificationFunction } from "../../utils/libs/Notification/Notification";
import { SET_FILM, SET_PHIM_DETAIL, SET_THONG_TIN_PHIM } from "../type/FilmType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const getFilm = (tenPhim='') => {
    return async dispatch => {
        try {
            const result = await quanLyPhimServices.layDanhSachPhim(tenPhim);
            dispatch({
                type: SET_FILM,
                arrFilm: result.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const layThongTinLichChieuAction = (id) => {
    return async dispatch => {
        const { data, status } = await quanLyPhimServices.layThongTinLichChieu(id);
        if (status === STATUS_CODE.SUCCESS) {
            dispatch({
                type: SET_PHIM_DETAIL,
                filmDetail: data.content
            })
        }
    }
}

export const themUploadHinhAction = (formData) => {
    return async dispatch => {
        dispatch(displayLoadingAction)
        try {
            const { data, status } = await quanLyPhimServices.themPhimUploadHinh(formData);
            if (status === STATUS_CODE.SUCCESS) {
                await notificationFunction('success', 'Thêm phim thành công !');
                history.push('/admin/films');
            }
            else{
            await notificationFunction('error', 'Thêm phim thất bại !')
            }
            await dispatch(hideLoadingAction)
        } catch (error) {
            await dispatch(hideLoadingAction)
            await notificationFunction('error', 'Thêm phim thất bại !')
            console.log(error)
        }
    }
}


export const layThongTinPhimAction = (maPhim) => {
    return async dispatch => {
        try {
            const { data, status } = await quanLyPhimServices.layThongTinPhim(maPhim);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_THONG_TIN_PHIM,
                    thongTinPhim: data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return async dispatch => {
        dispatch(displayLoadingAction)
        try {
            const { data, status } = await quanLyPhimServices.capNhatPhimUpload(formData);
            if(status===STATUS_CODE.SUCCESS){
                notificationFunction('success', 'Cập nhật phim thành công !');
                history.push('/admin/films');
            }
            else{
                notificationFunction('error', 'Cập nhật phim thất bại  !');
            }
            dispatch(hideLoadingAction)
        } catch (error) {
            notificationFunction('error', 'Cập nhật phim thất bại  !');
            dispatch(hideLoadingAction)
            console.log(error)
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async dispatch => {
        dispatch(displayLoadingAction)
        try {
            const { data, status } = await quanLyPhimServices.xoaPhim(maPhim);
            if (status === STATUS_CODE.SUCCESS) {
                notificationFunction('success', 'Xóa thành công !');
                dispatch(getFilm());
            }
            else {
                notificationFunction('error', 'Xóa không thành công !');
            }
            dispatch(hideLoadingAction)
        } catch (error) {
            dispatch(hideLoadingAction)
            notificationFunction('error', 'Xóa không thành công !');
            console.log(error)
        }
    }
}
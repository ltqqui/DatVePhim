import { quanLyRapPhim } from "../../services/QuanLyRapPhimServices"
import { STATUS_CODE } from "../../services/settingSystem";
import { SET_HE_THONG_RAP_CHIEU } from "../type/RapType";

export const layDanhSachRapAction=()=>{
    return async dispatch=>{
        const {data, status}= await quanLyRapPhim.layDanhSachRap();
        if(status===STATUS_CODE.SUCCESS){
            dispatch({
                type:SET_HE_THONG_RAP_CHIEU,
                heThongRapChieu:data.content
            })
        }
    }
}


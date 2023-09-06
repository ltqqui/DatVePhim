import {ThongTinLichChieu} from '../../_core/models/ThongTinPhongVe'
import { CHANGE_TAB_ACTIVE, CHUYEN_TAB, CLEAR_GHE_DANG_DAT, SET_GHE_DANG_DAT, SET_THONG_TIN_DAT_VE, SET_THONG_TIN_PHONG_VE } from '../type/ThongTinPhongVeType'
const stateDefault={
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat:[],
    danhSachGheKhachDat:[],
    tabActive:'1'
}

export const ThongTinPhongVeReducer=(state=stateDefault, action)=>{
    switch(action.type){
        case SET_THONG_TIN_PHONG_VE:{
            state.chiTietPhongVe=action.thongTinPhongVe
            console.log(state)
            return {...state};
        }
        case SET_GHE_DANG_DAT:{
            const danhSachGheDangDatUpdate=[...state.danhSachGheDangDat];
            const index=danhSachGheDangDatUpdate.findIndex(ghe => ghe.maGhe===action.gheDangDat.maGhe);
            if(index!==-1){
                danhSachGheDangDatUpdate.splice(index,1);
            }
            else {
                danhSachGheDangDatUpdate.push(action.gheDangDat);
            }
                if(danhSachGheDangDatUpdate.length>10){
                alert('Không được đặt quá 10 ghế !');
                    return {...state}
                }
            state.danhSachGheDangDat=danhSachGheDangDatUpdate;
            return {...state}
        }

        case SET_THONG_TIN_DAT_VE:{
            state.chiTietPhongVe.danhSachGhe=[...state.chiTietPhongVe.danhSachGhe]
            return {...state}
        }

        case CLEAR_GHE_DANG_DAT:{
            return {...state, danhSachGheDangDat:[]}
        }
        case CHUYEN_TAB:{
            return {...state, tabActive:'2'}
        }
        case CHANGE_TAB_ACTIVE:{
            return {...state, tabActive:action.number}
        }
        default : return {...state}
    }
}
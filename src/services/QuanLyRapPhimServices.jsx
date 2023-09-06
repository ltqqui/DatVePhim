import { GROUPID } from "../utils/Setting/config";
import { baseServices } from "./baseServices";


export class QuanLyRapPhim extends baseServices{
    constructor (){
        super();
    }

    layDanhSachRap=()=>{
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);
    }
    layThongTinHeThongRap=()=>{
        return this.get('api/QuanLyRap/LayThongTinHeThongRap');
    }
    layThongTinCumRap=(maHTR)=>{
        return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHTR}`);
    }
    
}

export const quanLyRapPhim=new QuanLyRapPhim();
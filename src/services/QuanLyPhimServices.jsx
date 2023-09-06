import { GROUPID } from "../utils/Setting/config";
import { baseServices } from "./baseServices";


export class QuanLyPhimServices extends baseServices{
    constructor (){
        super();
    }

    layDanhSachBanner=()=>{
        return this.get('api/QuanLyPhim/LayDanhSachBanner');
    }

    layDanhSachPhim=(tenPhim='')=>{
        if(tenPhim!==''){
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    }
    
    layThongTinLichChieu=(id)=>{
        return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
    }

    themPhimUploadHinh=(formData)=>{
       return this.post('api/QuanLyPhim/ThemPhimUploadHinh', formData);
    }
    layThongTinPhim=(maPhim)=>{
      return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)  
    }
    capNhatPhimUpload=(formData)=>{
        return this.post('api/QuanLyPhim/CapNhatPhimUpload', formData)
    }
    xoaPhim=(maPhim)=>{
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}

export const quanLyPhimServices=new QuanLyPhimServices();
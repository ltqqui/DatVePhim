import { GROUPID } from '../utils/Setting/config';
import {baseServices} from './baseServices'

class QuanLyNguoiDungServices extends baseServices{
    constructor (){
        super();
    }

    dangNhap=(thongTinDangNhap)=>{
        return this.post('api/QuanLyNguoiDung/DangNhap', thongTinDangNhap);
    }
    dangKy=(thongTinDangKy)=>{
        return this.post('api/QuanLyNguoiDung/DangKy',thongTinDangKy);
    }
    layThongTinNguoiDung=()=>{
        return this.post('api/QuanLyNguoiDung/ThongTinTaiKhoan')
    }
    layDanhSachNguoiDung=(account='')=>{
        if(account!==''){
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${account}`)
        }
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }
    layDanhSachLoaiNguoiDung=()=>{
        return this.get('api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung');
    }
    themNguoiDung=(thongTinNguoiDung)=>{
        return this.post('/api/QuanLyNguoiDung/ThemNguoiDung', thongTinNguoiDung);
    }
    capNhatThongTinNguoiDungAdmin=(thongTinCapNhat)=>{
        return this.post('api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',thongTinCapNhat);
    }
    xoaNguoiDungAdmin=(taiKhoan)=>{
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    }
    capNhatThongTinNguoiDung=(thongTinNguoiDung)=>{
        return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,thongTinNguoiDung);
    }
}


export const quanLyNguoiDungServices= new QuanLyNguoiDungServices ();


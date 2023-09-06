import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { baseServices } from "./baseServices";

class ThongTinPhongVe extends baseServices{
    constructor(){
        super()
    }

    layThongTinPhongVe=(maPhong)=>{
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maPhong}`)
    }

    datVe=(thongTinDatVe= new ThongTinDatVe())=>{ 
        return this.post('api/QuanLyDatVe/DatVe', thongTinDatVe)
    }
    taoLichChieu=(thongTinLichChieu)=>{
        return this.post(`api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu);
    }
}


export const thongTinPhongVe=new ThongTinPhongVe ()
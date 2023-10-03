import { SET_FILM, SET_PHIM_DANG_CHIEU, SET_PHIM_DETAIL, SET_PHIM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../type/FilmType"

const stateDefault={
    arrFilm:[
        {
            "maPhim": 10895,
            "tenPhim": "ALIENOID: Cuộc Chiến Xuyên Không 1",
            "biDanh": "alienoid-cuoc-chien-xuyen-khong-1",
            "trailer": "https://www.youtube.com/embed/ZmPvNvVsJCY",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/alienoid-cuoc-chien-xuyen-khong_gp00.png",
            "moTa": "Năm 2022, hai người ngoài hành tinh là Guard (Kim Woo-bin) và Thunder sinh sống tại Trái Đất đang tìm kiếm những tù nhân vượt ngục, vốn bị họ giam giữ trong cơ thể con người. Cảnh sát Moon (So Ji-sub) vô tình trở thành đối tượng bị truy đuổi mà không rõ lý do. Cùng lúc đó, ở triều đại Goryeo hơn 630 năm về trước, pháp sư xui xẻo Muruk (Ryu Jun-yeol) và “cô gái bắn sấm sét” Ean (Kim Tae-ri) đang cố gắng tranh giành một thanh gươm thần huyền thoại. Cuộc chiến khốc liệt ấy còn có sự tham gia của hai phù thủy hắc ám là Madam Black (Yum Jung-ah) và Mr. Blue (Jo Woo-Jin), cùng kẻ đeo mặt nạ bí ẩn Jajang (Kim Eui-sung). Một cánh cổng thời gian xuất hiện và mở ra sự kết nối giữa hai thời đại, tạo nên tình huống hỗn loạn chưa từng thấy.",
            "maNhom": "GP00",
            "ngayKhoiChieu": "2023-08-15T23:08:27.273",
            "danhGia": 7,
            "hot": false,
            "dangChieu": true,
            "sapChieu": false
          },
          {
            "maPhim": 10902,
            "tenPhim": "Phi Công Siêu Đẳng Maverick 1",
            "biDanh": "phi-cong-sieu-dang-maverick-1",
            "trailer": "https://www.youtube.com/embed/ZR99nOkEolM",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/phi-cong-sieu-dang-maverick-1_gp00.jpg",
            "moTa": "Sau hơn ba mươi năm phục vụ, Pete “Maverick” Mitchell từng nổi danh là một phi công thử nghiệm quả cảm hàng đầu của Hải quân, né tránh cơ hội thăng chức, điều khiến anh cảm thấy bị bó buộc, để trở về làm chính mình.",
            "maNhom": "GP00",
            "ngayKhoiChieu": "2023-08-10T09:40:55.94",
            "danhGia": 9,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
          },
    ],
    dangChieu:true,
    sapChieu:false,
    arrFilmDefault:[],
    filmDetail:{},
    thongTinPhim:{}
}

export const QuanLyPhimReducer=(state=stateDefault, action)=>{
    switch(action.type){
        case SET_FILM:{
            state.arrFilm=action.arrFilm;
            state.arrFilmDefault=action.arrFilm;
            return {...state}
        }
        case SET_PHIM_DANG_CHIEU:{
            state.dangChieu=!state.dangChieu;
            state.sapChieu=!state.sapChieu;
            state.arrFilm=state.arrFilmDefault.filter(item=>item.dangChieu===state.dangChieu);
            return {...state}
        } 
        case SET_PHIM_SAP_CHIEU:{
            state.sapChieu=!state.sapChieu;
            state.dangChieu=!state.dangChieu;
            state.arrFilm=state.arrFilmDefault.filter(item=>item.sapChieu===state.sapChieu);
            return {...state}
        }
        case SET_PHIM_DETAIL:{
            state.filmDetail=action.filmDetail;
            return {...state};
        }
        case SET_THONG_TIN_PHIM:{
            return {...state, thongTinPhim:action.thongTinPhim};
        }
        default : return {...state}
    }
}
import { SET_CAROUSEL } from "../type/CarouselType";

const statDefault = {
    arrCarousel: [
        {
            "maBanner": 1,
            "maPhim": 1282,
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png"
        }

    ]
}
export const CarouselReducer=(state=statDefault, action)=>{
    switch(action.type){
        case SET_CAROUSEL:{
            state.arrCarousel=action.arrImg;
            return {...state}
        }
        default : return {...state}
    }
}
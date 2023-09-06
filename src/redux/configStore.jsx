import {applyMiddleware, combineReducers, conbineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducer } from './reducer/CarouselReducer';
import { QuanLyPhimReducer } from './reducer/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducer/QuanLyRapReducer';
import { QuanLyNguoiDungReducer } from './reducer/QuanLyNguoiDungReducer';
import { ThongTinPhongVeReducer } from './reducer/ThongTinPhongVeReducer';
import { LoadingReducer } from './reducer/LoadingReducer';
const rootReducer =combineReducers({
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,
    ThongTinPhongVeReducer,
    LoadingReducer
})

export const store =createStore(rootReducer , applyMiddleware(thunk));
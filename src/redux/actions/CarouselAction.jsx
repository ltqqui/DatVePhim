import Axios from 'axios'
import { DOMAIN } from '../../utils/Setting/config'
import { quanLyPhimServices } from '../../services/QuanLyPhimServices'

export const getCarouselAction=()=>{
    return async dispatch=>{
        try {
            const result=await quanLyPhimServices.layDanhSachBanner()
            dispatch({
                type:'SET_CAROUSEL',
                arrImg:result.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}
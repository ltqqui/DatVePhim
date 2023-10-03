import React from 'react'
import { Tabs } from 'antd'
import './New.css'
import { useSelector } from 'react-redux';
import moment from 'moment';
export default function New(props) {
  console.log(props.newsRef)
  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
  const arrRandom = [];
  const arrRandomReview = [];

  for (let i = 0; i < 2; i++) {
    let number = Math.floor(Math.random() * 15) + 1;
    arrRandom.push(arrFilm[number]);
  }
  for (let i = 0; i < 2; i++) {
    let number = Math.floor(Math.random() * 25) + 16;
    arrRandomReview.push(arrFilm[number]);
  }
  return (
    <div className=' news new mx-72 animate__animated animate__fadeInLeft wow mt-20' id='news' style={{height:'800px'}} >
      <Tabs defaultActiveKey='5' tabPosition='top' >
        <Tabs.TabPane tab={<h3 className='text-xl'>Điện ảnh 24h</h3>} key={11}>
          <div className='flex justify-between '>
            <div style={{ width: '48%' }}>
              <img className='news-item' src={arrRandom[0]?.hinhAnh} style={{ width: '100%', height: '60%', borderRadius: 10 }} alt="" />
              <p className='font-semibold text-lg mb-1 news-title'>{arrRandom[0]?.tenPhim} dự kiến sẽ khởi chiếu vào ngày {moment(arrRandom[0]?.ngayKhoiChieu).format('DD/MM/YYYY')} xung quanh những ồn ào về mặt nội dung và lối diễn xuất thiếu chuyên nghiệp.  </p>
              <p > {arrRandom[0]?.moTa.length > 150 ? arrRandom[0]?.moTa.slice(0, 150) : arrRandom[0]?.moTa} .</p>
            </div>
            <div style={{ width: '48%' }}>
              <img  className='news-item' src={arrRandom[1]?.hinhAnh} style={{ width: '100%', height: '60%', borderRadius: 10 }} alt="" />
              <p className='font-semibold text-lg mb-1 news-title'>{arrRandom[1]?.tenPhim} dự kiến sẽ khởi chiếu vào ngày {moment(arrRandom[1]?.ngayKhoiChieu).format('DD/MM/YYYY')} với sự tham gia của nhiều người nổi tiếng hứa hẹn sẽ bùng nổ.  </p>
              <p> {arrRandom[1]?.moTa.length > 150 ? arrRandom[1]?.moTa.slice(0, 150) : arrRandom[1]?.moTa} .</p>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={<h3 className='text-xl '>Review</h3>} key={12}>
          <div className='flex justify-between '>
            <div className='news-item' style={{ width: '48%' }}>
              <img  className='news-item' src={arrRandomReview[0]?.hinhAnh} style={{ width: '100%', height: '60%', borderRadius: 10 }} alt="" />
              <p className='font-semibold text-lg mb-1 news-title'>{arrRandomReview[0]?.tenPhim}  </p>
              <p > {arrRandom[0]?.moTa.length > 150 ? arrRandom[0]?.moTa.slice(0, 150) : arrRandom[0]?.moTa} .</p>
            </div>
            <div className='news-item' style={{ width: '48%' }}>
              <img  className='news-item' src={arrRandomReview[1]?.hinhAnh} style={{ width: '100%', height: '60%', borderRadius: 10 }} alt="" />
              <p className='font-semibold text-lg mb-1 news-title'>{arrRandom[1]?.tenPhim} </p>
              <p>  {arrRandom[1]?.moTa} .</p>
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

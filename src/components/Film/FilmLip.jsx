import React, { useRef, useState } from 'react'
import './FilmLip.css'
import { PlayCircleOutlined } from '@ant-design/icons'
import { Button ,Modal} from 'antd';
import {NavLink} from 'react-router-dom'
export default function FilmLip(props) {
  const [open, setOpen] = useState(false);
  const [trailer, setTrailer] =useState('')
  const { item } = props
  const iframeRef = useRef(null);
  const [iframeSrc, setIframeSrc] = useState('https://www.youtube.com/embed/YOUR_VIDEO_ID');

  const stopVideo = () => {
    // Tạm dừng video bằng cách thay đổi URL
    setIframeSrc(iframeSrc.replace('autoplay=1', 'autoplay=0'));
  };
  return (
    <div className="flip-card" >
      <Modal
      title={`Trailer - ${item.tenPhim}`}
        centered
        open={open}
        onOk={async () => {
          await stopVideo()
          setTrailer('')
          setTimeout(()=>{
            setOpen(false)
          },100)
        }}
        onCancel={ async() => {
          await stopVideo()
          setTrailer('')
          setTimeout(()=>{
            setOpen(false)
          },100)
        }} 
        width={1000}
      >
         {/* {open ? <iframe  ref={iframeRef} width="100%" height="523" src={trailer}  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"   allowFullScreen={true}></iframe> : ''} */}
         <iframe width="100%" height="523"  src={trailer} frameBorder="0" allowFullScreen title="Embedded Video"></iframe>


      </Modal>
      <div className="flip-card-inner">
        <div className="flip-card-front"  style={{ backgroundImage: `url(${item.hinhAnh})`, width: '250px', height: '300px', backgroundPosition: 'center', backgroundSize: 'cover' }} >
          <div/>
          {/* <img src={item.hinhAnh} className='opacity-0' alt="Avatar" style={{ width: 250, height: 300 }} /> */}
        </div>
        <div className="flip-card-back " style={{ position: 'relative', backgroundImage: `url(${item.hinhAnh})`, width: '250px', height: '300px', backgroundPosition: 'center', backgroundSize: 'cover' }}>
          {/* < div style={{ }} /> */}
          <div className='flip-card-back-item' style={{ width: 250, height: 300, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <PlayCircleOutlined style={{ zIndex: 5, fontSize: '50px', cursor: 'pointer' }} onClick={() => {
                setOpen(true)
                setTrailer(item.trailer)
              }}/>
              <p className='text-lg mt-2'>{item.tenPhim}</p>
            </div>
          </div>
        </div>
      </div>
      <NavLink to={`/detail/${item.maPhim}`} style={{display:'block', color:'white'}} className="bg-orange-300 text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold">ĐẶT VÉ
      </NavLink>
    </div>

  )
}

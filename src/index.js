import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import * as signalR from '@aspnet/signalr'
import { DOMAIN } from './utils/Setting/config';
import './i18n'
//cấu hình signalR 

//đoạn code để kết nối với server lắng nghe sự kiện
// export const connection=new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build(); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

// connection.start().then(()=>{
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
// }).catch(err=>{
//   console.log(err)
// })





reportWebVitals();

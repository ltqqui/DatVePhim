import logo from "./logo.svg";
import "./App.css";
import {Router, Route , Switch} from "react-router-dom";
import Home from "./page/Home/Home";
import { HomeTemplate } from "./Template/HomeTemlate/HomeTemplate";
import { createBrowserHistory } from 'history';
import 'antd/dist/antd.css'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Contact from "./page/Contact/Contact";
import New from "./page/New/New";
import Login from "./page/Login/Login";
import Detail from "./page/Detail/Detail";
import { UserTemplate } from "./Template/UserTemplate/UserTemplate";
import CheckoutTemplate from "./Template/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./page/Checkout/Checkout";
import Loading from "./components/Loading/Loading";
import Register from "./page/Register/Register";
import Films from "./page/Admin/Films/Films";
import { AdminTemplate } from "./Template/AdminTemplate/AdminTemplate";
import Showtime from "./page/Admin/Showtime/Showtime";
import AddNew from "./page/Admin/Films/AddNew/AddNew";
import Edit from "./page/Admin/Films/Edit/Edit";
import UserManagement from "./page/Admin/UserManagement/UserManagement";
import AddUser from "./page/Admin/UserManagement/AddUser/AddUser";
import EditUser from "./page/Admin/UserManagement/EditUser/EditUser";
import Profile from "./page/Profile/Profile";
export const  history =createBrowserHistory();
function App(props) {
  return (
    <Router history={history}>
      <Loading/>
      <Switch>
        <HomeTemplate exact path='/' Component={Home}/>
        <HomeTemplate  exact path='/home' Component={Home}/>
        <HomeTemplate exact path='/profile' Component={Profile}/>
        <HomeTemplate exact path='/detail/:id' Component={Detail}/>
        <HomeTemplate exact path='/news' Component={New}/>
        <UserTemplate exact path ='/login' Component={Login} />
        <UserTemplate exact path ='/register' Component={Register} />
        <AdminTemplate exact path='/admin/films' Component={Films} />
        <AdminTemplate exact path='/admin/user' Component={UserManagement} />
        <AdminTemplate exact path='/admin/user/adduser' Component={AddUser} />
        <AdminTemplate exact path='/admin/user/edituser/:account' Component={EditUser} />
        <AdminTemplate exact path='/admin/films/showtime/:id' Component={Showtime} />
        <AdminTemplate exact path='/admin/films/addnew' Component={AddNew} />
        <AdminTemplate exact path='/admin/films/edit/:id' Component={Edit} />
        <CheckoutTemplate exact path='/checkout/:id' Component={Checkout} />
        </Switch>
    </Router>
  );
}
export default App;

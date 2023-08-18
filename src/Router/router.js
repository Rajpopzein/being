import { Route, Routes } from "react-router-dom";
import App from "../App";
// import ResponsiveDrawer from "../pages/Dashboard";
import PersistentDrawerLeft from "../pages/Dashboard"
import Userdetails from "../pages/UserDetails";
import DashboardItem from "../pages/DashboardItem";
import AdsPage from "../pages/AdsPage";
import UserGrid from "../pages/Users";
import OrdersPage from "../pages/OrdersPage";



const Router = () =>{
    return(
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path='/Dashboard' element={<DashboardItem/>}/>
            <Route path="/DashboardItem" element={<DashboardItem/>}/>
            <Route path="/userdetails" element={<Userdetails/>}/>
            <Route path="/ads" element={<AdsPage/>}/>
            <Route path="/users" element={<UserGrid/>}/>
            <Route path="/orders" element={<OrdersPage/>}/>
        </Routes>
    )
}


export default Router
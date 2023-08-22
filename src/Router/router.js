import { Route, Routes } from "react-router-dom";
import App from "../App";
// import ResponsiveDrawer from "../pages/Dashboard";

import Userdetails from "../pages/UserDetails";
import DashboardItem from "../pages/DashboardItem";
import AdsPage from "../pages/AdsPage";
import UserGrid from "../pages/Users";
import OrdersPage from "../pages/OrdersPage";
import PetFoodAccessories from "../pages/PetFoodAccessories";
import PostPage from "../pages/PostPage";
import Feedback from "../pages/Feedback";
import Orders_details from "../pages/Orders_details";
import AddUser from "../pages/AddUser";



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
            <Route path="/foodandaccessories" element={<PetFoodAccessories/>}/>
            <Route path="/post" element={<PostPage/>}/>
            <Route path="/feedback" element={<Feedback/>}/>
            <Route path="/orderdetails" element={<Orders_details/>}/>
            <Route path="/adduser" element={<AddUser/>}/>
        </Routes>
    )
}


export default Router
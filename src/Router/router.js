import { Route, Routes } from "react-router-dom";
import App from "../App";
// import ResponsiveDrawer from "../pages/Dashboard";
import PersistentDrawerLeft from "../pages/Dashboard"
import Userdetails from "../pages/UserDetails";
import DashboardItem from "../pages/DashboardItem";



const Router = () =>{
    return(
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path='/Dashboard' element={<PersistentDrawerLeft/>}/>
            <Route path="/DashboardItem" element={<DashboardItem/>}/>
             <Route path="/Dashboard/userdetails" element={<Userdetails/>}/>
        </Routes>
    )
}


export default Router
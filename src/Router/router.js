import { Route, Routes } from "react-router-dom";
import App from "../App";
import ResponsiveDrawer from "../pages/Dashboard";



const Router = () =>{
    return(
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path='/Dashboard' element={<ResponsiveDrawer/>}/>
        </Routes>
    )
}


export default Router
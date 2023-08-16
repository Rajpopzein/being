import { createSlice, AsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const petlistapi = AsyncThunk("api/petlisr", async(vale)=>{
    const listdata = await axios.get("https://demo.emeetify.com:81/pet/order/orderfilter?type=pet&firstname=")
    return listdata
})




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { states } from "./countryslice";


export const getCategory = createAsyncThunk(
    "api/category", async()=>{
     
        const data = await axios.get("https://demo.emeetify.com:81/pet/categories/avail_cats")
        return data.data
    }
)



const categoryslice = createSlice({
    name:'categoryApi',
    initialState:{
        data:null,
        status:'idle',
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCategory.fulfilled,(state,action)=>{
            state.status = "idle";
            state.data = action.payload;
        }).addCase(getCategory.pending, (state)=>{
            state.status = "pending"
        }).addCase(getCategory.rejected,(state,action)=>{
            state.status = 'error';
            state.error = action.error.message
        })
    }

})

export const category  =  categoryslice.reducer
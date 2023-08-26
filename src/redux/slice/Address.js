import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getaddress = createAsyncThunk("api/getaddress",async(value)=>{
    const header = value.token
    const data = await axios.get(`https://demo.emeetify.com:81/pet/address/?user_id=${value.id}`, header)
    return data.data
})




const address_slice = createSlice({
    name:'address_api',
    initialState:{
        data:null,
        loading:'idle',
        error:null
    },
    reducers:{},

    extraReducers:(builder)=>{
        builder.addCase(getaddress.pending,(state)=>{
            state.loading = "pending";
        }).addCase(getaddress.fulfilled,(state, action)=>{
            state.data = action.payload;
            state.loading='idle';
        }).addCase(getaddress.rejected,(state, action)=>{
            state.error = action.error;
            state.loading = "error";
        })
    }

})


export const address_slices = address_slice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const petlistapi = createAsyncThunk("getapi/petlisr", async(value)=>{
   const request = value
    console.log("filter", value)
    const listdata = await axios.get(`https://demo.emeetify.com:81/pet/order/orderfilter?type=${request.type}&firstname=${request.filter}`)
    console.log("filter", listdata)
    return listdata
})


const pet_slice = createSlice({
    name:'petapi',
    initialState:{
        petdata: null,
        loading: 'idle',
        error: null,
    },
    reducers:{

    },
    extraReducers:(builder) => {
        builder.addCase(petlistapi.pending, (state)=>{
            state.loading = "pending"
        }).addCase(petlistapi.fulfilled,(state, action)=>{
            state.loading = 'idle';
            state.petdata = action.payload
            console.log("action",action)
        }).addCase(petlistapi.rejected,(state, action)=>{
            state.loading='error';
            state.error = action.error.message
        })
    }
})



export const petreducer = pet_slice.reducer

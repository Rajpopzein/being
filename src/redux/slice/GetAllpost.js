import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getallpost = createAsyncThunk("api/getallpost", async()=>{
    const config = {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      };
    const data = await axios.get('https://demo.emeetify.com:81/pet/pets/',config)
    return data.data
})




const postget = createSlice({
    name:'getPostapi',
    initialState:{
        data:null,
        status:'idle',
        error:null
    },
    reducers:{},

    extraReducers:(builder)=>{
        builder.addCase(getallpost.pending,(state)=>{
            state.status = "pending"
        }).addCase(
            getallpost.fulfilled,(state, action)=>{
                state.data = action.payload.data
                state.status = 'idle'
            }
        ).addCase(getallpost.rejected,(state, action)=>{
            state.status = 'error';
            state.error = action.error.message
        })
    }
})


export const postgetapi = postget.reducer

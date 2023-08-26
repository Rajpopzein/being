import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { json } from "react-router-dom";



export const getFeedback = createAsyncThunk("api/feedback",async()=>{
    const data = await axios.get("https://demo.emeetify.com:81/pet/feedback/")
    console.log("feedback", data)
    return data.data
})



const feedbackslice = createSlice({
    name:'Feedback Api',
    initialState:{
        data:null,
        loading:'idle',
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getFeedback.pending,(state)=>{
            state.loading = "pending";
        }).addCase(
            getFeedback.fulfilled, (state, action) =>{
                state.loading = 'idle';
                state.data = action.payload;
            }
        ).addCase(
            getFeedback.rejected, (state, action)=>{
                state.loading = 'error';
                state.data = action.error.message;
            }
        )
    }
})

export const feedbackslices = feedbackslice.reducer
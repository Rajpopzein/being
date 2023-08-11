import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


export const fetchuser = createAsyncThunk('api/fetchuserdata', async()=>{
    const responce = await axios.get("https://demo.emeetify.com:81/pet/utils/dashboard")
    console.log("apiresonce", responce)
    return responce.data
})

// console.log("resss",fetchuser.pending)

const apiSlice = createSlice({
    name:'ApiCall',
    initialState:{
        userdata: null,
        loading: 'idle',
        error: null,
    },
    reducers:{},

    extraReducers:(builder) => {
        builder.addCase(fetchuser.pending, (state)=> {
            state.loading = 'pending';
        })
        .addCase(fetchuser.fulfilled, (state, action)=>{
            state.loading = 'idle';
            state.userdata = action.payload.data[0];
            console.log(state.userdata,"ppp")
        })
        .addCase(fetchuser.rejected, (state, action) => {
            state.loading = 'idle';
            state.error = action.error.message;
          });
    }

})

export default apiSlice.reducer;


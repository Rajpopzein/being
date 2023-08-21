import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getAlluser = createAsyncThunk("api/allusers",async()=>{
    const data = await axios.get("https://demo.emeetify.com:81/pet/users/filternames?firstname=&lastname=&mobile_no=")
    return data.data
})

export const singleUser = createAsyncThunk('api/singleuser',async(phone)=>{
    const singleUserdata = await axios.get(`https://demo.emeetify.com:81/pet/users/filternames?firstname=&lastname=&mobile_no=${phone}`)
    // console.log("singleuser", singleUserdata)
    return singleUserdata.data
})

const getallusercall = createSlice({
    name:'AlluserApi',
    initialState:{
        data:null,
        loading: "idle",
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getAlluser.pending,(state)=>{
            state.loading = "pending"
        }).addCase(getAlluser.fulfilled,(state, action)=>{
            state.loading = "idle"
            state.data = action.payload
        }).addCase(getAlluser.rejected,(state, action)=>{
            state.loading = "error"
            state.error = action.error.message
        })
    }
})


const getsingleuser = createSlice({
    name:'singleuserApi',
    initialState:{
        data:null,
        loading: "idle",
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(singleUser.pending,(state)=>{
            state.loading = "pending"
        }).addCase(singleUser.fulfilled,(state, action)=>{
            state.loading = "idle"
            state.data = action.payload
        }).addCase(singleUser.rejected,(state, action)=>{
            state.loading = "error"
            state.error = action.error.message
        })
    }
})


export const getallusercalls = getallusercall.reducer;
export const getsingleusersetails = getsingleuser.reducer
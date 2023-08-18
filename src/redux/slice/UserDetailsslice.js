import { createSlice } from "@reduxjs/toolkit";



const userdetailsslice = createSlice({
    name:'sepuserdetails',
    initialState:{
        data : null
    },
    reducers:{
        sepuserdata:(state, action)=>{
            state.data = action.payload
        }
    }
})

export const {sepuserdata} = userdetailsslice.actions

export default userdetailsslice.reducer

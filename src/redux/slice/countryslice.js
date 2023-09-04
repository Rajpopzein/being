import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


export const getAllCountry = createAsyncThunk('api/country', async()=>{
    const responce = await axios.get("https://demo.emeetify.com:81/pet/location/countries")
    console.log("api", responce.data.data)
    return responce.data
})


export const getState = createAsyncThunk('api/getstate', async(selectedCountry)=>{
    const responce = await axios.get(`https://demo.emeetify.com:81/pet/location/states?country_code=${selectedCountry}`)
    return responce.data
})

export const getdistrict = createAsyncThunk('api/getdistrict', async(value) => {
    const distvalue = value;
    const responce = await axios.get(` https://demo.emeetify.com:81/pet/location/cities/?state_code=${distvalue.statecode}&country_code=${distvalue.countycode}`)
    console.log(responce,"dis")
    return responce.data
})
// console.log("resss",fetchuser.pending)




const countryslices = createSlice({
    name:'ApiCall',
    initialState:{
        userdata: null,
        loading: 'idle',
        error: null,
    },
    reducers:{},

    extraReducers:(builder) => {
        builder.addCase(getAllCountry.pending, (state)=> {
            state.loading = 'pending';
        })
        .addCase(getAllCountry.fulfilled, (state, action)=>{
            state.loading = 'idle';
            state.userdata = action.payload.data;
            // console.log(state.userdata,"ppp")
        })
        .addCase(getAllCountry.rejected, (state, action) => {
            state.loading = 'idle';
            state.error = action.error.message;
          });
    }

})

const Stateslices = createSlice({
    name:'stateapi',
    initialState:{
        userdata: null,
        loading: 'idle',
        error: null,
    },
    reducers:{},

    extraReducers:(builder) => {
        builder.addCase(getState.pending, (state)=> {
            state.loading = 'pending';
        })
        .addCase(getState.fulfilled, (state, action)=>{
            state.loading = 'idle';
            state.userdata = action.payload.data;
            // console.log(state.userdata,"ppp")
        })
        .addCase(getState.rejected, (state, action) => {
            state.loading = 'idle';
            state.error = action.error.message;
          });
    }

})


const Districtslices = createSlice({
    name:'stateapi',
    initialState:{
        userdata: null,
        loading: 'idle',
        error: null,
    },
    reducers:{},

    extraReducers:(builder) => {
        builder.addCase(getdistrict.pending, (state)=> {
            state.loading = 'pending';
        })
        .addCase(getdistrict.fulfilled, (state, action)=>{
            state.loading = 'idle';
            state.userdata = action.payload.data;
            // console.log(state.userdata,"ppp")
        })
        .addCase(getdistrict.rejected, (state, action) => {
            state.loading = 'idle';
            state.error = action.error.message;
          });
    }

})

export const county = countryslices.reducer;
export const states = Stateslices.reducer;
export const district = Districtslices.reducer;


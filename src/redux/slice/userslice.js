import {createSlice} from '@reduxjs/toolkit'


const conterSlice = createSlice({
        name:'userData',
        initialState : {
            // datas : null
            datas: []
        },
        reducers:{
           userdatass:(state, action)=>{
            state.datas.push(action.payload)
           }
        }
        
})


export const {userdatass} = conterSlice.actions
export default conterSlice.reducer


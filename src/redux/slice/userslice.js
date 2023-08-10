import {createSlice} from '@reduxjs/toolkit'


const conterSlice = createSlice({
        name:'userData',
        initialState : {
            datas : null
        },
        reducers:{
           userdatass:(state, action)=>{
            const cred = action.payload
            const data = {...state.datas, ...cred}
            state.datas = data
           }
        }
        
})


export const {userdatass} = conterSlice.actions
export default conterSlice.reducer


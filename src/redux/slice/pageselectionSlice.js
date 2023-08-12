import { createSlice } from "@reduxjs/toolkit";


const pageSelector = createSlice({
    name:'nameSelector',
    initialState: {
        page: 0
    },
    reducers:{
        selecterchange:(state, action)=>{
            state.page = action.payload
        }
    }

});

export const {selecterchange} = pageSelector.actions;

export default pageSelector.reducer
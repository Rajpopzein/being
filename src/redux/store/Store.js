import { configureStore } from "@reduxjs/toolkit";
import reduser from '../slice/userslice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import api_Slice from "../slice/api_Slice";
import pageSelector from "../slice/pageselectionSlice";
import { petreducer } from "../slice/petsApislice";
import {getallusercalls, getsingleusersetails} from "../slice/AlluserSlice";
import UserDetailsslice from "../slice/UserDetailsslice";


const persistconfig = {
    key: 'root',
    storage,
}
const pageconfig = {
    key: 'page',
    storage,
}


const persistreducer = persistReducer(persistconfig, reduser)
const pageselection = persistReducer(pageconfig,pageSelector)


const store = configureStore({
    reducer:{
        userdetails: persistreducer,
        dashapi : api_Slice,
        pageSelector : pageselection,
        petsList : petreducer,
        Alluser : getallusercalls,
        sepuser : UserDetailsslice,
        singleuserdetails : getsingleusersetails
    } 
})

const presistor = persistStore(store);

export {store, presistor}
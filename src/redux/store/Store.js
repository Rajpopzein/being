import { configureStore } from "@reduxjs/toolkit";
import reduser from '../slice/userslice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import api_Slice from "../slice/api_Slice";
import pageSelector from "../slice/pageselectionSlice";

const persistconfig = {
    key: 'root',
    storage,
}


const persistreducer = persistReducer(persistconfig, reduser)


const store = configureStore({
    reducer:{
        userdetails: persistreducer,
        dashapi : api_Slice,
        pageSelector : pageSelector
    }
})

const presistor = persistStore(store);

export {store, presistor}
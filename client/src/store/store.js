//will create one global rudcer hold all the application state
//different slice auth slice,admin-slice,shopping slice

import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductSlice from './admin/products-slice';
import shopProductSlice from "./shop/product-slice";

const store=configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:adminProductSlice,
        shopProducts:shopProductSlice
    }
})

export default store;
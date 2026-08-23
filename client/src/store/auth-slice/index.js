import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState={
    isAuthenticated:false,
    isLoading:true,
    user:null
}
//async thunk
export const registerUser=createAsyncThunk('/auth/register',
    async(formData)=>{
        const responce= await axios.post('/api/auth/register',formData,{
            withCredentials:true,
        })
        return responce.data;
    }
)

//async thunk for login
export const loginUser=createAsyncThunk('/auth/login',
    async(formData)=>{
        const responce= await axios.post('/api/auth/login',formData,{
            withCredentials:true,
        })
        return responce.data;
    }
)

//async thunk for logout
export const logoutUser=createAsyncThunk('/auth/logout',
    async()=>{
        const responce= await axios.post('/api/auth/logout',{},{
            withCredentials:true,
        })
        return responce.data;
    }
)
export const checkAuth=createAsyncThunk('/auth/checkauth',
    async()=>{
        const responce= await axios.get('/api/auth/check-auth',{
            withCredentials:true,
            headers:{
                'Cache-Control':'no-store,no-cache,must-revalidate,proxy-revalidate',
                Expires:'0'
            }
        })
        return responce.data;
    }
)

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser: (state,action)=>{

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
        }).addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.user= action.payload.success ? action.payload.user:null ;
            state.isAuthenticated=action.payload.success ? true : false;
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
        }).addCase(checkAuth.pending,(state)=>{
            state.isLoading=true
        }).addCase(checkAuth.fulfilled,(state,action)=>{
            console.log(action);
            
            state.isLoading=false;
            state.user= action.payload.success ? action.payload.user:null ;
            state.isAuthenticated=action.payload.success ? true : false;
        }).addCase(checkAuth.rejected,(state,action)=>{
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
        }).addCase(logoutUser.fulfilled,(state,action)=>{
            console.log(action);
            
            state.isLoading=false;
            state.user= null ;
            state.isAuthenticated=false;
        })
    }
})

export const{setUser}=authSlice.actions
export default authSlice.reducer
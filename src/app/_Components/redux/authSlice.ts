import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

let initialState = {isLoading:false as boolean, token:localStorage.getItem('userToken') as null|string, error:null as null|string};

let authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers:{
        setLoading:(state)=>{
            state.isLoading = true;
        },
        setToken:(state, action)=>{
            state.isLoading = false;
            state.token = action.payload.token;
            localStorage.setItem('userToken', action.payload.token);
            toast.success(action.payload.message)
        },
        setError:(state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload,{
                duration:4000
            })
        },
        removeToken:(state)=>{
            state.token = null;
            localStorage.removeItem('userToken');
        }
    }
});

export let authReducer = authSlice.reducer;
export let {setLoading, setToken, setError, removeToken} = authSlice.actions;
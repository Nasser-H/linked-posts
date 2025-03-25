import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

  let token : null | string = null;
if (typeof window !== 'undefined') {
   token = localStorage.getItem('userToken');
}


const initialState = {isLoading:false as boolean, token: token as null|string, error:null as null|string};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers:{
        setLoading:(state)=>{
            state.isLoading = true;
        },
        getToken:(state)=>{
            state.token;
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

export const authReducer = authSlice.reducer;
export const {setLoading, setToken, setError, removeToken, getToken} = authSlice.actions;
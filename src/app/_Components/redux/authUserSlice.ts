import { UserExra } from "@/app/interFaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
    isLoading: true as boolean,
    user: null as null|UserExra,
    error: null as any
};

export let getUserData = createAsyncThunk("authUser/getUserData", async ()=>{
    let response = await fetch("https://linked-posts.routemisr.com/users/profile-data",{
        method: "GET",
        headers:{
            "token" : `${localStorage.getItem("userToken")}`,
            "Content-Type" : "application/json"
        }
    });
    let data = await response.json();
    return data.user;
});

let authUserSlice = createSlice({
    name: "authUser",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(getUserData.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(getUserData.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(getUserData.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export let authUserReducer = authUserSlice.reducer;
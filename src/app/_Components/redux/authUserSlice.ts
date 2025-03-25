import { UserExra } from "@/app/interFaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true as boolean,
    user: null as null|UserExra,
};

export const getUserData = createAsyncThunk("authUser/getUserData", async ()=>{
    const response = await fetch("https://linked-posts.routemisr.com/users/profile-data",{
        method: "GET",
        headers:{
            "token" : `${localStorage.getItem("userToken")}`,
            "Content-Type" : "application/json"
        }
    });
    const data = await response.json();
    return data.user;
});

const authUserSlice = createSlice({
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
        builder.addCase(getUserData.rejected,(state)=>{
            state.isLoading = false;
        });
    }
});

export const authUserReducer = authUserSlice.reducer;
import { Comment } from "@/app/interFaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

let initialState = {
    isLoadingComments: true as boolean,
    Comemnts: [] as Comment[],
}

export let getComments = createAsyncThunk("postComments/getComments", async (PostID : string) =>{
    let response = await fetch(`https://linked-posts.routemisr.com/posts/${PostID}/comments`,{
        method : "GET",
        headers : {
            "token" : `${localStorage.getItem("userToken")}`,
            "Content-Type" : "application/json"
        }
    });
    let data = await response.json();
    return data.comments;
});

let postCommentsSlice = createSlice({
    name: "postComments",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(getComments.pending, (state)=>{
            state.isLoadingComments = true;
        });
        builder.addCase(getComments.fulfilled, (state, action)=>{
            state.isLoadingComments = false;
            state.Comemnts = action.payload;
        });
        builder.addCase(getComments.rejected, (state)=>{
            state.isLoadingComments = false;
        });
    }
});

export let postCommentsReducer = postCommentsSlice.reducer;
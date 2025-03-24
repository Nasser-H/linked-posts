import { Post } from "@/app/interFaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
    isLoading: true as boolean,
    post : null as null|Post,
    error : null as any
};

export let getPost = createAsyncThunk('post/getPost',async (PostID : string)=>{
    let response = await fetch(`https://linked-posts.routemisr.com/posts/${PostID}`,{
        method : "GET",
        headers : {
            "token" : `${localStorage.getItem("userToken")}`,
            "Content-Type" : "application/json"
        }
    });
    let data = await response.json();
    return data.post;
});

let postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(getPost.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(getPost.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.post = action.payload;
        });
        builder.addCase(getPost.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
    }
})

export let PostReducer = postSlice.reducer;
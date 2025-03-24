import { Post } from "@/app/interFaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
    isLoading : true as boolean,
    posts : [] as Post[],
    error : null as any
};

export let getUserPosts = createAsyncThunk("userPosts/getUserPosts", async (UserID : string)=>{
    let response = await fetch(`https://linked-posts.routemisr.com/users/${UserID}/posts`,{
        method : "GET",
        headers: {
            "token" : `${localStorage.getItem("userToken")}`,
            "Content-Type" : "application/json"
        }
    });
    let data = await response.json();
    console.log(data);
    
    return data.posts;
});

let userPostsSlice = createSlice({
    name:"userPosts",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(getUserPosts.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(getUserPosts.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.posts = action.payload;
        });
        builder.addCase(getUserPosts.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export let userPostsReducer = userPostsSlice.reducer;
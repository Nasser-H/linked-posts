import { Post } from "@/app/interFaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true as boolean,
    post : null as null|Post,
};

export const getPost = createAsyncThunk('post/getPost',async (PostID : string)=>{
    const response = await fetch(`https://linked-posts.routemisr.com/posts/${PostID}`,{
        method : "GET",
        headers : {
            "token" : `${localStorage.getItem("userToken")}`,
            "Content-Type" : "application/json"
        }
    });
    const data = await response.json();
    return data.post;
});

const postSlice = createSlice({
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
        builder.addCase(getPost.rejected,(state)=>{
            state.isLoading = false;
        });
    }
})

export const PostReducer = postSlice.reducer;
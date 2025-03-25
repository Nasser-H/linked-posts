import { Post } from "@/app/interFaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading:true as boolean,
    posts: [] as Post[],
};

export const getPosts = createAsyncThunk('posts/getPosts',async ()=>{
    const respons = await fetch("https://linked-posts.routemisr.com/posts?limit=47",{
        method: 'GET',
        headers:{
            "token": `${localStorage.getItem('userToken')}`,
            "Content-Type": "application/json"
        }
    });
    const data = await respons.json();
    return data.posts;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(getPosts.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(getPosts.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.posts = action.payload
        });
        builder.addCase(getPosts.rejected,(state)=>{
            state.isLoading = false;
        });
    },

})

export const postsReducer = postsSlice.reducer;
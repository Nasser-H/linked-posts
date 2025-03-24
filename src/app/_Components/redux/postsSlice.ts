import { Post } from "@/app/interFaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
    isLoading:true as Boolean,
    posts: [] as Post[],
};

export let getPosts = createAsyncThunk('posts/getPosts',async ()=>{
    let respons = await fetch("https://linked-posts.routemisr.com/posts?limit=47",{
        method: 'GET',
        headers:{
            "token": `${localStorage.getItem('userToken')}`,
            "Content-Type": "application/json"
        }
    });
    let data = await respons.json();
    return data.posts;
});

let postsSlice = createSlice({
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

export let postsReducer = postsSlice.reducer;
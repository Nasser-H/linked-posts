import { Post } from "@/app/interFaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : true as boolean,
    posts : [] as Post[],
    isPostsLoaded: false as boolean
};

export const getUserPosts = createAsyncThunk("userPosts/getUserPosts", async (UserID : string)=>{
    const response = await fetch(`https://linked-posts.routemisr.com/users/${UserID}/posts`,{
        method : "GET",
        headers: {
            "token" : `${localStorage.getItem("userToken")}`,
            "Content-Type" : "application/json"
        }
    });
    const data = await response.json();
    console.log(data);
    
    return data.posts;
});

const userPostsSlice = createSlice({
    name:"userPosts",
    initialState,
    reducers:{
        setIsPostsLoaded:(state)=>{
            state.isPostsLoaded = false;
        },
        setIsPosts:(state)=>{
            state.posts = [];
        },
    },
    extraReducers(builder){
        builder.addCase(getUserPosts.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(getUserPosts.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.posts = action.payload;
            state.isPostsLoaded = true;
        });
        builder.addCase(getUserPosts.rejected, (state)=>{
            state.isLoading = false;
        });
    }
});

export const userPostsReducer = userPostsSlice.reducer;
export const {setIsPostsLoaded, setIsPosts} = userPostsSlice.actions;
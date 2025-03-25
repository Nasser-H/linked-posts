import { Comment } from "@/app/interFaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingComments: true as boolean,
    Comemnts: [] as Comment[],
}

export const getComments = createAsyncThunk("postComments/getComments", async (PostID : string) =>{
    const response = await fetch(`https://linked-posts.routemisr.com/posts/${PostID}/comments`,{
        method : "GET",
        headers : {
            "token" : `${localStorage.getItem("userToken")}`,
            "Content-Type" : "application/json"
        }
    });
    const data = await response.json();
    return data.comments;
});

const postCommentsSlice = createSlice({
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

export const postCommentsReducer = postCommentsSlice.reducer;
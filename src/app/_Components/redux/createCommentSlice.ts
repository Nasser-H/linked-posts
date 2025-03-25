import { Comment } from "@/app/interFaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    isLoadingComment:false as boolean,
    commentsPost: null as null|Comment[],
};

export const createCommentPost = createAsyncThunk("createComment/createCommentPost", async (body : {content: string, post: string})=>{
    const response = await fetch("https://linked-posts.routemisr.com/comments",{
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "token" : `${localStorage.getItem("userToken")}`,
            "Content-Type" : "application/json"
        }
    });
    const data = await response.json();
    return data;
});

const createCommentSlice = createSlice({
    name: "createComment",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(createCommentPost.pending, (state)=>{
            state.isLoadingComment = true;
        });
        builder.addCase(createCommentPost.fulfilled, (state , action)=>{
            state.isLoadingComment = false;
            state.commentsPost = action.payload.comments;
            toast.success(action.payload.message);
        });
        builder.addCase(createCommentPost.rejected, (state)=>{
            state.isLoadingComment = false;
        });
    }
});

export const createCommentReducer = createCommentSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    isLoading : false as boolean,
    error: null as any,
    anyError: "null" as null|string
};

export const createPost = createAsyncThunk('createPost/createPost', async (FormData : FormData)=>{
    const respons = await fetch("https://linked-posts.routemisr.com/posts",{
        method: "POST",
        body : FormData,
        headers:{
            "token" : `${localStorage.getItem("userToken")}`
        }
    });
    const data = await respons.json();
    console.log(data);
    
    return data;
});

const createPostSlice = createSlice({
    name: "createPost",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(createPost.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(createPost.fulfilled,(state , action)=>{
            state.isLoading = false;
            if(action.payload.message){
                toast.success(action.payload.message);
                state.anyError = null;
            }else{
                toast.error("An error occurred.");
                state.anyError = "An error occurred.";                
            }
        });
        builder.addCase(createPost.rejected,(state, action )=>{
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export const createPostReducer = createPostSlice.reducer;
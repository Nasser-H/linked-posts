import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

let initialState = {
    isLoading : false as boolean,
    error: null as any,
    anyError: "null" as null|string
};

export let createPost = createAsyncThunk('createPost/createPost', async (FormData : FormData)=>{
    let respons = await fetch("https://linked-posts.routemisr.com/posts",{
        method: "POST",
        body : FormData,
        headers:{
            "token" : `${localStorage.getItem("userToken")}`
        }
    });
    let data = await respons.json();
    console.log(data);
    
    return data;
});

let createPostSlice = createSlice({
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

export let createPostReducer = createPostSlice.reducer;
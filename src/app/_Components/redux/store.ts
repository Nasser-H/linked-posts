import { authReducer } from './authSlice';
import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from './postsSlice';
import { PostReducer } from './postSlice';
import { createPostReducer } from './createPostSlice';
import { authUserReducer } from './authUserSlice';
import { userPostsReducer } from './userPostsSlice';
import { createCommentReducer } from './createCommentSlice';
import { postCommentsReducer } from './postCommentsSlice';

export let store = configureStore({
    reducer:{
        authReducer,
        postsReducer,
        PostReducer,
        createPostReducer,
        authUserReducer,
        userPostsReducer,
        createCommentReducer,
        postCommentsReducer
    }
});

export type State = ReturnType<typeof store.getState>;

export type storeDispach = typeof store.dispatch;
'use client'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import Loading from '../loading';
import { Box, Button, CircularProgress, Paper, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { State, storeDispach } from '../_Components/redux/store';
import { createPost } from '../_Components/redux/createPostSlice';

export default function CreatePost() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setLoading(false);
    }else{
      router.push('/login');
    }
  },[router]);

  const {isLoading} = useSelector((state : State)=>state.createPostReducer);
  const dispatch = useDispatch<storeDispach>();

  function handleSubmit(e : FormEvent){
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData();
    if(form.body.value){
      formData.append('body', form.body.value);
    }
    if(form.image.files[0]){
      formData.append('image', form.image.files[0]);
    }
    if(!form.body.value && !form.image.files[0]){
      formData.append('body', form.body.value);
      formData.append('image', form.image.files[0]);      
    }    
    dispatch(createPost(formData));
    if(form.body.value || form.image.files[0]){
      router.push('/profile');
    }
  }

  return <>
  {loading?<Loading/>:
    <Box>
      <h1 style={{ textAlign:'center',paddingBlock:'1rem' }}>Add Post</h1>
            <Paper elevation={10} sx={{ marginBottom:'2rem' }}>
              <form onSubmit={(e)=>handleSubmit(e)} style={{ display:'flex',flexDirection:'column',gap:'1.5rem',padding:'2rem' }}>
              <TextField id="body" name='body' label="body" variant="outlined" />
              <TextField id="image" type='file' label="image" variant="standard" />
              <Button disabled={isLoading == true}  type='submit' variant="contained">{isLoading? <CircularProgress size="30px" /> : 'ADD'}</Button>
            </form>
            </Paper>
    </Box>
  }
  </>
}

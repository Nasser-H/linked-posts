"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loading from '../loading';
import { Avatar, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { State, storeDispach } from '../_Components/redux/store';
import { getUserData } from '../_Components/redux/authUserSlice';
import Image from 'next/image';
import { getUserPosts } from '../_Components/redux/userPostsSlice';
import PostDetails from '../_Components/postDetails/page';
import { Post } from '../interFaces';
import { jwtDecode } from 'jwt-decode';

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch<storeDispach>();
  let { user } = useSelector((state : State)=>state.authUserReducer);
  let { isLoading, posts } = useSelector((state : State)=>state.userPostsReducer);
  const [loading, setLoading] = useState(true);
  const userID : {user: string, iat: number} = jwtDecode(`${localStorage.getItem("userToken")}`);

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setLoading(false);
      dispatch(getUserPosts(userID.user));      
      if(!user){
      dispatch(getUserData());
      }
    }else{
      router.push('/login');
    }
  },[]);
    const sortedPosts = posts
      .filter(post => post.createdAt)
      .sort((a: Post, b: Post) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime()
      });
  return <>
  {loading  ?<Loading/>:
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:"-30px" }}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            border: '4px solid #fff',
          }}
        >
          {user?.photo&& 
          <Image src={user?.photo} alt={user?.name} width={120} height={120} style={{ borderRadius: '50%' }} />
          }
        </Avatar>
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray', textAlign: 'center', marginTop: 1 }}>
          {user?.email}
        </Typography>
        {user?.dateOfBirth && (
          <Typography variant="body2" sx={{ color: 'gray', textAlign: 'center', marginTop: 1 }}>
            <strong>Date of Birth:</strong> {user.dateOfBirth}
          </Typography>
        )}
      </Box>
        {loading||isLoading ?<Loading/>:
      sortedPosts?.map((post : Post )=>
      <PostDetails key={post._id} post={post} comments={false}/>
      )}
    </Box>
  }

  </>
}

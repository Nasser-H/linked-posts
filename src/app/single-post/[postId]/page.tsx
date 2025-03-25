"use client"
import PostDetails from '@/app/_Components/postDetails/page';
import { getPost } from '@/app/_Components/redux/postSlice';
import { State, storeDispach } from '@/app/_Components/redux/store';
import Loading from '@/app/loading';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function SinglePost() {

  const [loading, setLoading] = useState(true);
  const {postId} = useParams();
  const disPatch = useDispatch <storeDispach>();
  const routre = useRouter();
  const {isLoading, post} = useSelector((state: State)=> state.PostReducer);
  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      setLoading(false);
      disPatch(getPost(`${postId}`));
    }else{
      routre.push('/login');
    }
  },[disPatch, postId, routre ]);


  return <>
  {loading || isLoading ? <Loading/>:
  post && <PostDetails post={post} comments={true} />
  }
  </>
}

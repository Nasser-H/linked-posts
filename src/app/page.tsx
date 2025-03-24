'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { useDispatch, useSelector } from "react-redux";
import { State, storeDispach } from "./_Components/redux/store";
import { getPosts } from "./_Components/redux/postsSlice";
import PostDetails from "./_Components/postDetails/page";
import { Post } from "./interFaces";

export default function Home() {

  const dispatch = useDispatch <storeDispach>();
  let {isLoading, posts } = useSelector((state : State)=>state.postsReducer);
  
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setLoading(false);
      dispatch(getPosts());
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
  {loading||isLoading ?<Loading/>:
  sortedPosts.map((post : Post, index:number)=><PostDetails key={index} post={post} comments={false} />)
  }
  </>
}

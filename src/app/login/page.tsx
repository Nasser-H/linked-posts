'use client'
import { Button, CircularProgress, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../_Components/redux/store';
import { setError, setLoading, setToken } from '../_Components/redux/authSlice';
import { useRouter } from 'next/navigation';

export default function Login() {
 let isLoading = useSelector((state : State) => state.authReducer.isLoading);

 const dispatch = useDispatch();

 const router = useRouter();
  const validationSchema = Yup.object().shape({
    email:Yup.string().required("email is a required").email("must be a valid email"),
    password:Yup.string().required("password is a required").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"incorrect password")
  })
  async function login(values : {email:string, password:string}){
    dispatch(setLoading());
    let respons = await fetch("https://linked-posts.routemisr.com/users/signin",{
      method:"POST",
      body: JSON.stringify(values),
      headers:{
        'Content-type' : "application/json"
      }
    });
    let data = await respons.json();
    if(respons.ok){
      dispatch(setToken(data))
      router.push('/');
    }else{
      dispatch(setError(data.error));
    }
  }
const formik = useFormik({
  initialValues:{
    email:"",
    password:""
  },
  validationSchema,
  onSubmit:login
})
  return <>
  <h1 style={{ textAlign:'center',paddingBlock:'1rem' }}>Login</h1>
        <Paper elevation={10} sx={{ marginBottom:'2rem' }}>
          <form onSubmit={formik.handleSubmit} style={{ display:'flex',flexDirection:'column',gap:'1.5rem',padding:'2rem' }}>
          <TextField id="email" label="Email" variant="outlined" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          {formik.errors.email&&formik.touched.email&&
          <p style={{ marginBlock:"-1rem",color:"red" }}>*{formik.errors.email}</p>
          }
          <TextField id="password" type='password' label="Password" variant="outlined"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
          {formik.errors.password&&formik.touched.password&&
          <p style={{ marginBlock:"-1rem",color:"red" }}>*{formik.errors.password}</p>
          }
          <Button disabled={isLoading == true} type='submit' variant="contained">{isLoading? <CircularProgress size="30px" /> : 'Login'}</Button>
        </form>
        </Paper>
  </>
}

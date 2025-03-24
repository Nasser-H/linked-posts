"use client"
import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../_Components/redux/store'
import { setError, setLoading, setToken } from '../_Components/redux/authSlice'
import { useRouter } from 'next/navigation'


export default function Register() {
let isLoading = useSelector((state : State) => state.authReducer.isLoading);
const dispatch = useDispatch();
const router = useRouter()
const validationSchema = Yup.object().shape({
  name: Yup.string().required("name is a required"),
  email: Yup.string().required("email is a required").email(),
  password: Yup.string().required("password is a required").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Your password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g. #, ?, !, @, %, ^, &, *)."),
  rePassword: Yup.string().required("rePassword is a required").oneOf([Yup.ref('password')],"Password does not match"),
  dateOfBirth: Yup.string().required("date Of Birth is a required").nullable(),
  gender: Yup.string().required("gender is a required"),
});

async function register(values : {name : string, email : string, password : string, rePassword : string, dateOfBirth : string, gender : string}){
  dispatch(setLoading());
  let response = await fetch("https://linked-posts.routemisr.com/users/signup",{
      method:'POST',
      body: JSON.stringify(values),
      headers:{
        'Content-type': 'application/json'
    }
    });
    let data = await response.json();
    console.log(data);
    
    if(response.ok){
      dispatch(setToken(data));
      router.push('/login');
    }else{
      dispatch(setError(data.error));
    }
}

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema,
    onSubmit: register,
  });
  return <>
  <h1 style={{ textAlign:'center',paddingBlock:'1rem' }}>Register</h1>
        <Paper elevation={10} sx={{ marginBottom:'2rem' }}>
          <form onSubmit={formik.handleSubmit} style={{ display:'flex',flexDirection:'column',gap:'1.5rem',padding:'2rem' }}>
          <TextField id="name" label="Your Name" variant="outlined" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
          {formik.errors.name&&formik.touched.name&&
          <p style={{ marginBlock:"-1rem",color:"red" }}>*{formik.errors.name}</p>
          }
          <TextField id="email" label="Email" variant="outlined" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          {formik.errors.email&&formik.touched.email&&
          <p style={{ marginBlock:"-1rem",color:"red" }}>*{formik.errors.email}</p>
          }
          <TextField type='password' id="password" label="Password" variant="outlined" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
          {formik.errors.password&&formik.touched.password&&
          <p style={{ marginBlock:"-1rem",color:"red" }}>*{formik.errors.password}</p>
          }
          <TextField type='password' id="rePassword" label="re-Password" variant="outlined" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} />
          {formik.errors.rePassword&&formik.touched.rePassword&&
          <p style={{ marginBlock:"-1rem",color:"red" }}>*{formik.errors.rePassword}</p>
          }
          <DatePicker
          label="Date of Birth"
          value={formik.values.dateOfBirth ? dayjs(formik.values.dateOfBirth) : null}
            onChange={(date) => {
              formik.setFieldValue('dateOfBirth', date ? date.format('YYYY-MM-DD') : '');
            }}
            slots={{
              textField: (params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  error={formik.errors.dateOfBirth && formik.touched.dateOfBirth}
                  onBlur={() => formik.setFieldTouched("dateOfBirth", true)}
                />
              ),
            }}
          />
          {formik.errors.dateOfBirth&&formik.touched.dateOfBirth&&
          <p style={{ marginBlock:"-1rem",color:"red" }}>*{formik.errors.dateOfBirth}</p>
          }
          <FormControl>
            <FormLabel id="gender">Gender</FormLabel>
            <RadioGroup row
            value={formik.values.gender} 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            aria-labelledby="gender"
            name="gender">
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          {formik.errors.gender&&formik.touched.gender&&
          <p style={{ marginTop:".1rem",color:"red" }}>*{formik.errors.gender}</p>
          }
          </FormControl>
          <Button type='submit' variant="contained">Register</Button>
        </form>
        </Paper>
  </>
}

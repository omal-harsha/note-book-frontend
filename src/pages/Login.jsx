import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userStore} from '../features/user'
import { useFormik } from 'formik'
import {userSchema} from "../validation/users"


export const Login = () => {

  const navigate =  useNavigate()
  const dispatch = useDispatch()

  const [errMsg, setErrMsg] = useState("")  //store a error message

  //login function
  const userLogin = async() => {

    const apiUrl = process.env.API_URL
    console.log("API URL " +apiUrl)
    const user = {username: values.username, password: values.password} // user credentials

    try {
        const response = await axios.post(`http://localhost:3001/login`, user, {withCredentials: true} )
        console.log(" login response" +response.data.message)
        setErrMsg(response.data.message)
        if(response.data.success){
            const {userID , username} = response.data;
            localStorage.setItem('userID', userID)
            localStorage.setItem('username', username)

            dispatch(userStore({userID:userID,username: username}))
            navigate('/')

        }
    } catch (error) {
        console.error(error)
    }

  }

  //form validation 
  const {values,errors,handleBlur,handleChange,handleSubmit,touched} = useFormik({
    initialValues: {
        username: "",
        password: ""
    },
    validationSchema: userSchema,
    onSubmit: userLogin,
  })

  return (
    <div>
        <div className='flex h-screen bg-blue-100 justify-center font-poppins'>
            <div className=' hidden lg:flex bg-white shadow-xl rounded-l-3xl items-center justify-center'>
                <img src='https://firebasestorage.googleapis.com/v0/b/blogsite-33dcd.appspot.com/o/images%2Fnotebook.jpg?alt=media&token=35513b94-7783-42fc-ab0d-f4afc6633872' className='w-full max-w-xl'/>
            </div>
            <div className=' bg-gray-200 shadow-xl rounded-r-3xl sm:w-full md:w-auto md:px-20 lg:px-32 items-center flex'>
                <div className='items-center text-center mx-auto'>
                    <h1 className='text-3xl font-semibold mb-10'>Login</h1>

                    <form onSubmit={handleSubmit} className='space-y-5 w-full '>

                    <div>
                      <input 
                      onChange ={handleChange}
                      value={values.username} 
                      onBlur={handleBlur}     
                      type='text' 
                      id='username' 
                      placeholder='Username' 
                      className={`border px-2 focus:outline-none rounded-lg w-full max-w-lg py-2 ${errors.username && touched.username ? "border border-red-600" : ""}`}
                      />
                    </div>
                      {errors.username && touched.username && <span className='text-red-500  text-xs'> {errors.username}</span>}

                    <div>
                      <input 
                      onChange ={handleChange}
                      value={values.password} 
                      onBlur={handleBlur}
                      type='password' 
                      id='password' 
                      placeholder='Password' 
                      className={`border px-2 focus:outline-none rounded-lg w-full max-w-lg py-2 ${errors.password && touched.password ? "border border-red-600" : ""}`}
                      />
                    </div>
                      {errors.password && touched.password && <span className='text-red-500 text-xs'> {errors.password}</span>}
                    
                    <button type='submit' className='w-full max-w-lg py-2 bg-[#0E86D4] hover:bg-[#56b9e7] shadow-lg shadow-[#7eb3d6] rounded-lg text-white font-bold '>LOGIN</button>
                    </form>
                    <p className='text-red-600 text-center mt-3'> {errMsg} </p>
                    <p className='text-center text-blue-500 group text-sm cursor-pointer duration-300 mt-5'>Don't you have an account? <span className='underline group-hover:text-blue-700' onClick={()=> navigate("/register")}> Register </span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

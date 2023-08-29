import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Register = () => {

  const navigate =  useNavigate()

  const [user,setUser] = useState({
    username: "",
    password: ""
  })

  const handleChange = (event) => {
    const {name,value} = event.target
    setUser({...user, [name]: value})
  }

  const handleSubmit = async(e) => {
    console.log(user)
    e.preventDefault()

    try {
        const response = await axios.post("http://localhost:3001/register", user)
        console.log(response.data)
        if(response.data.success){
            navigate('/login')
        }
    } catch (error) {
        console.error(error)
    }

  }

  return (
    <div className='flex '>
        <div className='w-1/2 bg-blue-400 h-screen'>
        </div>
        <div className='w-1/2 bg-gray-200 h-screen px-32 pt-52'>
            <div className='items-center space-y-10'>
                <input type='text' name='username' className='border w-full max-w-lg py-2'onChange={handleChange} value={user.username}/>
                <input type='text' name='password' className='border w-full max-w-lg py-2' onChange={handleChange} value={user.password}/>
                <button className='w-full max-w-lg py-2 bg-blue-200' onClick={handleSubmit}>REGISTER</button>
            </div>
        </div>
    </div>
  )
}

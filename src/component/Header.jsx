import React from 'react'
import { Link } from 'react-router-dom'
import { useDarkMode } from './DarkModeContext'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'


export const Header = () => {


    const {darkmode, setDarkmode} = useDarkMode() // theme status

    const navigate = useNavigate()

    const user = localStorage.getItem('userID')  
    const username = localStorage.getItem('username') || ''  //get username from local storage
    

    // remove the cookies and local storage data when logout
    const logout = () => {
        localStorage.removeItem('userID')
        Cookies.remove('access_token')
        navigate("/login")
    
    }

    

  return (
    <div className={`h-28  ${darkmode ? "bg-blue-400" : "bg-[#0f2231]"}  duration-300 flex px-44 items-center justify-between`}>
            <div className=''>
                <h1 className={`text-4xl font-bold text-${darkmode ? "black" : "white"} font-poppins`}>Note Book</h1>
            </div>
            <div className='space-x-4 flex items-center'>
                <div className='flex space-x-4 items-center'>
                {!user && (
                    <>
                    <Link to={'/login'}>
                        <button className={`px-3 py-1 hover:bg-black border text-${darkmode ? "black" : "white"} border-${darkmode ? "black" : "white"} rounded-lg font-poppins hover:text-white text-xl font-semibold duration-300 ease-in-out`}>Login</button>
                    </Link>
                    <Link to={'/register'}>
                        <button className='px-3 py-1 hover:bg-gray-900 border bg-gray-700 text-white border-gray-500 rounded-lg font-poppins hover:text-white text-xl font-semibold duration-300 ease-in-out'>Register</button>
                    </Link>
                    </>
                )} 
                {user && (
                    <div className='flex items-end space-x-4'>
                        <h1 className={`text-${darkmode ? "black" : "white"} font-semibold`}>Hi {username}</h1>
                        <button className='px-3 py-1 hover:bg-gray-900 border bg-gray-700 text-white border-gray-500 rounded-lg font-poppins hover:text-white text-xl font-semibold duration-300 ease-in-out' onClick={logout}>Logout</button>
                    </div>
                )}
                </div>
                
            </div>
        
    </div>
  )
}

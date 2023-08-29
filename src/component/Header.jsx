import React from 'react'
import { Link } from 'react-router-dom'
import { UilBrightnessHalf  } from '@iconscout/react-unicons'


export const Header = () => {

    

  return (
    <div className='h-20 bg-blue-300 flex px-44 items-center justify-between'>
            <div className=''>
                <h1 className='text-4xl font-bold text-black font-poppins'>Note Book</h1>
            </div>
            <div className='space-x-4 flex items-center'>
                <Link to={'/login'}>
                    <button className='px-3 py-1 hover:bg-black border border-black rounded-lg font-poppins hover:text-white text-xl font-semibold duration-300 ease-in-out'>Login</button>
                </Link>
                <Link to={'/register'}>
                    <button className='px-3 py-1 hover:bg-gray-900 border bg-gray-700 text-white border-gray-500 rounded-lg font-poppins hover:text-white text-xl font-semibold duration-300 ease-in-out'>Register</button>
                </Link>
                <div className='cursor-pointer hover:scale-110 duration-300 ease-in-out text-3xl '>
                    <UilBrightnessHalf className='scale-125'/>
                </div>
            </div>
        
    </div>
  )
}

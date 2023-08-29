import React, { useEffect, useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import axios from 'axios';

export const Home = () => {


    const [notes,setnotes] = useState();

    const user = {user : "64ec81c5430d6a71d6bac639"}

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get("http://localhost:3001/getnotes", user)
                console.log(response.data)

            } catch (error) {
                console.error(error)
            }
        }

        fetchNote()
    })

  return (
    <div className='bg-gray-100 py-8  flex flex-col items-center font-poppins'>

        {/* ---------------------------------------------------------------- */}

        <div className="flex justify-between items-center my-10 py-2 rounded-full bg-white md:mx-auto shadow-lg md:w-[600px] sm:mx-10 ">
                    <UilSearch className="ml-4 text-gray-500"/>
                    <input type="text" className="py-1 px-2 w-full ml-3 focus:outline-none text-lg font-poppins" placeholder="Search by Title..."/>
                    <p className="bg-blue-500 hover:bg-blue-400 cursor-pointer duration-300 hover:scale-105 font-bold text-white font-OpenSans px-5 py-1.5 rounded-full mx-2">Search</p>
                </div>

        {/* ---------------------------------------------------------------- */}

        {/* note card */}
        <div className='bg-blue-100 px-10 py-8 rounded-lg w-full max-w-lg space-y-3 shadow-lg'>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-semibold'>Title</h1>
                    <div className='flex font-semibold text-gray-400 space-x-2  justify-center'>
                        <h1>Category</h1>
                        <p>|</p>
                        <h1>Date</h1>
                    </div>
            </div>
            <div className='flex justify-between'>
                <p className='w-full max-w-lg text-gray-600'>note note note note note not.......</p>
                <button className='px-3 py-1 bg-blue-400 rounded-lg text-white font-semibold text-sm hover:scale-105 duration-300 ease-in-out hover:shadow-md'>View</button>
            </div>
        </div>
    </div>
  )
}

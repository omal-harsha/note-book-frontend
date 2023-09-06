import React, { useEffect, useState } from 'react'
import { UilMultiply,UilFileEditAlt,UilTrashAlt} from '@iconscout/react-unicons'
import axios from 'axios'
import Cookies from 'js-cookie';
import { Update } from './Update';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const SingleNote = ({noteId,controlPopUp}) => {

    const navigate = useNavigate()

    //note initial value
    const [notes,setNotes] = useState({
        _id : noteId,
        title : "",
        note: "",
        date: "",
        category: "",
        owner : ""
    })
    
    
    const [updatePopUp,setUpdatePopUp] = useState(false) // handle update note modal

    //taostify notification
    const notify = (msg) => {
        toast.success(msg,{
            position: toast.POSITION.TOP_CENTER,
            theme: 'dark'
        })
    }

    const token = Cookies.get('access_token'); //get JWT

    //note delete function
    const deleteNote = async (e) => {

        e.preventDefault()
        const userConfirmed = window.confirm('Are you sure you want to delete?'); //get confirmation
        if(userConfirmed){
            const deleteItem = await axios.delete(`https://note-book-backend-umber.vercel.app/deletenote/${noteId}`,{
                headers: {
                    token: token
                }
            })
            notify("Note delete successfully")
            controlPopUp(false) //close the pop-up
        }
    }

    //fetch note details modal loading time
    useEffect(() => {
        
        const fetchNote = async () => {
            try {
                const response = await axios.post('http://localhost:3001/singlenote',{noteId: noteId})
                setNotes(response.data)
            } catch (error) {
                navigate("/")
                console.error(error)
            }
        }

        fetchNote()
    },[])

    //modal pop-up handle
    const updatemodal = (e) => {
        e.preventDefault()
        setUpdatePopUp(true)
    }

  return (
    <div className='h-screen flex justify-center z-[500] items-center fixed top-0 left-1/2 transform -translate-x-1/2  w-screen'>
        <div className='flex backdrop-blur-lg  backdrop-filter flex-col mx-2 w-full max-w-2xl px-8 min-h-[350px] rounded-lg shadow-xl bg-gray-400/50 py-8 font-poppins'>
           <ToastContainer />
            <div className={`text-lg md:text-3xl font-bold text-black mb-1 flex justify-between`}>
                <h1>{notes.title}</h1>
                <div className='flex -mt-2 -mr-2'>
                    <p className='text-[10px] md:text-sm text-gray-600 mr-2'>{notes.date}</p>
                    <div className='cursor-pointer hover:scale-105 ' onClick={()=> controlPopUp(false)}> <UilMultiply/> </div>
                </div>
            </div>
            <p className='text-xs mb-5'>({notes.category})</p>
            <p className='text-xs md:text-sm'>{notes.note}</p>

            <div className='flex space-x-4 absolute bottom-5 right-10'>
                <button onClick={deleteNote} className='px-2 py-1 bg-red-700 hover:bg-red-600 font-semibold text-white rounded-md flex'> <UilTrashAlt className= "scale-75 mr-1" /> Delete</button>
                <button onClick={updatemodal} className='px-2 py-1 bg-blue-600 hover:bg-blue-500 font-semibold text-white rounded-md flex'> <UilFileEditAlt className= "scale-75 mr-1"/> Update</button>
            </div>
        </div>
        {updatePopUp && <Update note={notes} updatePopUp={setUpdatePopUp} controlPopUp={controlPopUp}/>}
    </div>
  )
}

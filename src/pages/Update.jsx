import React, { useState } from 'react'
import { UilMultiply,UilFileEditAlt} from '@iconscout/react-unicons'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Update = ({note,updatePopUp,controlPopUp}) => {


    //note details load
    const [editNote,setEditNote] = useState({
        noteID : note._id,
        title : note.title,
        note: note.note,
        date: note.date,
        category: note.category,
        owner : note.owner
    })

    //text field edit handle
    const handleChange = (event) => {
        const {name,value} = event.target
        setEditNote({...editNote, [name]: value})
    }

    //toastify notification
    const notify = (msg) => {
        toast.success(msg,{
            position: toast.POSITION.TOP_CENTER,
            theme: 'dark'
        })
    }

    //note update function
    const updateNote = async () => {
        try {
            await axios.patch('https://note-book-backend-umber.vercel.app/updatenote',editNote)

            notify("Note update successfully")
            updatePopUp(false)
            controlPopUp(false)
        } catch (error) {
            console.error(error)
        }
    }


  return (
    <div className='h-screen flex justify-center z-[500] items-center fixed top-0 left-1/2 transform -translate-x-1/2  w-screen'>
        <div className='flex backdrop-blur-lg  backdrop-filter flex-col  w-full max-w-2xl mx-2 px-4 md:px-8 min-h-[430px] rounded-lg shadow-xl bg-gray-400/50 py-8 font-poppins'>
            <ToastContainer />
            <div className={`text-lg md:text-3xl font-bold text-black mb-1 flex justify-between`}>
                <input value={editNote.title} name='title' placeholder='Title' className='px-1 focus:outline- rounded-lg bg-gray-200' maxLength={25} onChange={handleChange}/>
                <div className='flex md:flex-row flex-col items-end -mt-2 -mr-2'>
                    <p className='text-[10px] md:text-sm text-gray-600 mr-2'> {editNote.date}</p>
                <div className='cursor-pointer hover:scale-105 ' onClick={ () => {updatePopUp(false); controlPopUp(false)}}> <UilMultiply/> </div>
                </div>
            </div>

            <div className='flex space-x-2 mb-5 mt-2 items-center bg-gray-200 rounded-lg pl-2 w-max'>
                <p className='text-sm'>Category:</p>
                <select
                    id="selectOption"
                    name="category"
                    value={editNote.category}
                    onChange={handleChange}
                    className='rounded-lg focus: outline-none w-full'
                    >
                    <option value="" disabled>Please select</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                </select>
            </div>

            <textarea placeholder='add your note....' className='text-sm min-h-[250px] focus:outline-none px-1 rounded-lg bg-gray-200' value={editNote.note} name='note' onChange={handleChange}/>

            <div className='flex space-x-4 absolute bottom-5 right-10'>
                <button className='px-2 py-1 bg-gray-600 hover:bg-gray-500 font-semibold text-white rounded-md flex' onClick={() => updatePopUp(false)}>  Cancel</button>
                <button className='px-2 py-1 bg-blue-600 hover:bg-blue-500 font-semibold text-white rounded-md flex' onClick={updateNote}> <UilFileEditAlt className= "scale-75 mr-1" /> Update</button>
            </div>
        </div>
    </div>
  )
}

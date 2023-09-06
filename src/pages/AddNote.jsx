import React from 'react'
import { UilPlus,UilMultiply } from '@iconscout/react-unicons'
import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import {noteSchema} from "../validation/notes"
import { useDarkMode } from '../component/DarkModeContext';

 
export const AddNote = ({controlPopUp}) => {


    const user = localStorage.getItem('userID') || '' //get userID from localstorage

    //generate the current date in format YYYY-MM-DD
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

 

    //react toastify notifications
    const notify = (msg) => {
        toast.success(msg,{
            position: toast.POSITION.TOP_CENTER,
            theme: 'dark'
        })
    }



    const token = Cookies.get('access_token');  //get a JWT token
    const {darkmode, setDarkmode} = useDarkMode() //get the theme


    // create a new note
    const noteCreate = async() => {

        //note details
        const addNote = {
            title : values.title,
            note: values.title,
            date: formattedDate,
            category: values.category,
            owner : user
        }

        try {
            const response = await axios.post("https://note-book-backend-umber.vercel.app/createnote", addNote,
            {
                headers: {
                    token: token
                }
            })
            if(response.data.success){
                notify("Note add successfully")
                controlPopUp(false)
            }
        } catch (error) {
            console.error(error)
        }
    
      }

      //formik form validation
      const {values,errors,handleBlur,handleChange,handleSubmit,touched} = useFormik({
        initialValues: {
            title: "",
            category: "",
            date: formattedDate,
            note: "",
            owner : user
        },
        validationSchema: noteSchema,
        onSubmit: noteCreate,
      })


  return (
    <div className='h-screen flex justify-center z-[500] items-center fixed top-0 left-1/2 transform -translate-x-1/2  w-screen'>
        <ToastContainer />
            <form onSubmit={handleSubmit}
            className='flex backdrop-blur-lg  backdrop-filter flex-col  w-full max-w-2xl mx-2 px-4 md:px-8 min-h-[430px] rounded-lg shadow-xl bg-gray-600/50 py-8 font-poppins'>

                {/* ------------------------------ Title ------------------------------------- */}

                <div className={`text-xl md:text-3xl font-bold text-black mb-1 flex justify-between`}>
                    <div className='flex flex-col'>
                        <input value={values.title} 
                        name='title' 
                        placeholder='Title' 
                        className='px-1 focus:outline-none rounded-lg bg-gray-200 w-full' 
                        maxLength={15} 
                        onChange={handleChange}
                         />
                        {errors.title && touched.title && <p className='text-red-500 font-normal mt-1 text-xs'> {errors.title}</p>}
                    </div>

                    <div className='flex -mt-2 -mr-2'>
                        <div className='cursor-pointer hover:scale-105 ' onClick={ () => {controlPopUp(false)}}> <UilMultiply/> </div>
                    </div>
                </div>

                {/* ------------------------------ category Dropdown ------------------------------------- */}

                <div className='flex space-x-2  mt-2 items-center mb-5 bg-gray-200 rounded-lg pl-2 w-max'>
                    <p className=' text-xs md:text-sm'>Category:</p>
                        <select
                        id="selectOption"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        className='rounded-lg focus: outline-none text-xs md:text-sm'
                        >
                            <option value="" disabled>Please select</option>
                            <option value="Personal">Personal</option>
                            <option value="Work">Work</option>
                        </select>
                </div>
                {errors.category && touched.category && <p className='text-red-500 -mt-4 mb-5 font-normal text-xs'> {errors.category}</p>}

                {/* ----------------------------- Note section ------------------------------------- */}

                <textarea 
                placeholder='add your note....' 
                className={`text-sm min-h-[250px] focus:outline-none p-2 rounded-lg ${darkmode ? "bg-gray-200" : "bg-gray-600 text-white"}  ${!errors.note  ? "mb-8" : "mb-0"}`} 
                value={values.note} 
                name='note' 
                onChange={handleChange}/>

                {errors.note && touched.note && <p className='text-red-500 mb-5 font-normal mt-1 text-xs'> {errors.note}</p>}

                <div className='flex space-x-4 absolute bottom-4 right-10'>
                    <button type='submit' className='px-2 py-1 bg-blue-600 hover:bg-blue-500 font-semibold text-white rounded-md flex' > <UilPlus className= "scale-75 mr-1"/> Save</button>
                </div>
            </form>
    </div>
  )
}

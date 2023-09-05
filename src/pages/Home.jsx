import React, { useEffect, useState } from 'react'
import { UilSearch,UilBrightnessHalf } from '@iconscout/react-unicons'
import axios from 'axios';
import Cookies from 'js-cookie';
import { SingleNote } from './SingleNote.jsx';
import { AddNote } from './AddNote.jsx';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import ReactPaginate from "react-paginate";


export const Home = () => {


    const navigate = useNavigate()
    
    const [notes,setnotes] = useState([]);  //note store from Database

    const [darkMode,setDarkMode] = useState(localStorage.getItem("darkmode") === "true") //get a theme

    const [selectedNoteId, setSelectedNoteId] = useState("");  // store a selected note ID

    const [popUp, setPopUp] = useState(false) // single note view modal pop-up handle
    const [addPopUp, setAddPopUp] = useState(false) //add note modal pop-up handle
    
    
    const token = Cookies.get('access_token');  // get a JWT 
    const user = localStorage.getItem('userID') || ''  //get a User ID
    

    //get a all note page loading time
    useEffect(() => {

        const fetchNote = async () => {
            if(token){
                try {
                    const response = await axios.post("http://localhost:3001/getnotes",{user:user},
                    {
                        withCredentials: true,
                        headers: {
                            token: token
                        }
                    })
                    setnotes(response.data)

                } catch (error) {
                    navigate("/login")
                    console.error(error)
            }}else{
                navigate("/login")
            }
        }

        fetchNote()
    },[popUp,addPopUp])


    //shorten the note text
    const truncateNote = (description,count) => {
        const MAX_CHR_LENGTH = count
            if (description.length > MAX_CHR_LENGTH) {
            return `${description.slice(0, MAX_CHR_LENGTH)}...`;
            }
        return description;
    };

    //handle the darkmode theme with local storage
    useEffect(() => {
        window.localStorage.setItem("darkmode", darkMode.toString());
    }, [darkMode]);

    //change the darkmode theme
    const changeTheme = ()=> {
    setDarkMode(!darkMode)
    console.log(darkMode)
    
}

//-------------pagination--------------------

const [pageNumber, setPageNumber] = useState(0);

const usersPerPage = 5;
const pagesVisited = pageNumber * usersPerPage

const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const pageCount = Math.ceil(notes.length / usersPerPage);

  return (

    <div className={`${!darkMode ? "bg-[#161727]" : "bg-gray-100"}  py-8  flex flex-col items-center font-poppins duration-1000`}>
        
        <div className={`cursor-pointer absolute right-8 top-12 hover:scale-110 duration-300 ease-in-out text-3xl text-white`} onClick={changeTheme}>
                    <UilBrightnessHalf className='scale-125'/>
        </div>

        {/* ------------------------Search bar------------------------------ */}

        <div className="flex justify-between items-center my-10 py-2 rounded-full bg-white md:mx-auto shadow-lg md:w-[600px] sm:mx-10 ">
            <UilSearch className="ml-4 text-gray-500"/>
            <input type="text" className="py-1 px-2 w-full ml-3 focus:outline-none text-lg font-poppins" placeholder="Search by Title..."/>
            <p className="bg-blue-500 hover:bg-blue-400 cursor-pointer duration-300 hover:scale-105 font-bold text-white font-OpenSans px-5 py-1.5 rounded-full mx-2">Search</p>
        </div>

        {/* ---------------------------------------------------------------- */}

        <button className='px-4 py-2 bg-[#3f3f3f] font-bold hover:shadow-lg hover:scale-105 duration-300 ease-in-out text-white rounded-lg border-black border' onClick={() => {setAddPopUp(true)}}>ADD NEW NOTE</button>

        {/*-------------- note card---------------- */} 
        { notes.slice(pagesVisited,pagesVisited + usersPerPage).map((note) => (

        <div key={note._id} className={`${!darkMode ? "bg-[#929292]" : "bg-blue-100"} px-10 py-8 rounded-lg w-full max-w-lg space-y-3 my-3 shadow-lg`}>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-semibold'>{note.title}</h1>
                    <div className={`flex text-sm font-semibold ${!darkMode ? "text-gray-200" : "text-gray-400"}  space-x-2  justify-center`}>
                        <h1>{note.category}</h1>
                        <p>|</p>
                        <h1>{note.date}</h1>
                    </div>
            </div>
            <div className='flex justify-between'>
                <p className={`w-full max-w-lg ${!darkMode ? "text-white" : "text-gray-600"}`}>{truncateNote(note.note,35)}</p>
                <button onClick={() => {setSelectedNoteId(note._id);setPopUp(!popUp)}}  className={`px-3 py-1 ${!darkMode ? "bg-blue-600" : "bg-blue-400"} rounded-lg text-white font-semibold text-sm hover:scale-105 duration-300 ease-in-out hover:shadow-md`}>View</button>

                
            </div>
        </div>
        ))} 

        {/* --------pagination section-------- */}

         <ReactPaginate className={`flex flex-wrap ${!darkMode ? "text-white" : "text-black"} justify-center items-center mb-10 space-x-2 space-y-2`}
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName=""
        previousLinkClassName='bg-blue-500  px-2 py-1 rounded-md text-white'
        nextLinkClassName='bg-blue-500 px-2  py-1 rounded-md text-white'
        //disabledClassName={"paginationDisabled"}
        activeClassName="text-white bg-blue-500  px-2 rounded-lg"
      />

        {/* --------modal components---------- */}
        {popUp && <SingleNote noteId={selectedNoteId} controlPopUp ={setPopUp}/>}
        {addPopUp && <AddNote controlPopUp ={setAddPopUp}/>}
        <ToastContainer />
    </div>
  )
}

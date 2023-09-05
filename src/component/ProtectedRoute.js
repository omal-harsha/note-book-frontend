import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import axios from "axios";


//handle the protected route 

const ProtectedRoute = ({children}) => {

  const token = Cookies.get("access_token");  //get token from cookies

    if(!token){
      return <Navigate to="/login" />;
    }

    try {

      //JWT decode and get user ID
      const decode = jwtDecode(token) || ''
      const userID = decode.id
      const valid =  checkUser(userID)  
      
          if(valid){
              return children;
          }else{
            return <Navigate to="/login" />;
          }
        } catch (error) {
        
        return <Navigate to="/login" />;
      }

};

//chech the USER ID is valid or not from the database
const checkUser = async (userID) => {
  try {

      console.log("user " + userID)
      const response = await axios.post("http://localhost:3001/usercheck", {userID:userID}, {withCredentials: true})
      console.log("protect response " + response.data.exists)
  } catch (error) {
    return false
  }
}


export default ProtectedRoute;
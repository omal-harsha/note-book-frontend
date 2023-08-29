import './App.css';
import { Header } from './component/Header';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom"
import { Register } from './pages/Register';

const LayOut = () => {
  return(
    <>
      <Header/>
      <Outlet/>
    </>
  )
}
//<Footer/>

function App() {

  const router = createBrowserRouter([
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/",
        element: <LayOut/>,
        children: [
          {
            path:"/",
            element: <Home/>
          }
        ]
      },
      {
        path: "/register",
        element: <Register/>
      }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

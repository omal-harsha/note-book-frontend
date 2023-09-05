import { createContext, useContext, useState } from "react";

const DarkeModeContext = createContext()

//check the status of localstorage to change darktheme or light
export const DarkModeProvider = ({children}) => {
    const [darkmode,setDarkmode] = useState(localStorage.getItem("darkmode") === "true")
    console.log("ctprovide stst " + darkmode)

    return(
        <DarkeModeContext.Provider value={{darkmode,setDarkmode}}>
            {children}
        </DarkeModeContext.Provider>
    )
}

export const useDarkMode = () => useContext(DarkeModeContext)
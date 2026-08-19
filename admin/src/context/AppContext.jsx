import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    
    const value = {

    backendUrl: import.meta.env.VITE_BACKEND_URL

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
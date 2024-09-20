import { createContext, ReactNode, useState } from "react";


// define types
type Props = {
    children: ReactNode
}
type ContextType = {
    auth: boolean
}



export const Context = createContext<ContextType | undefined>(undefined);

const Provider = ({children}: Props) => {

    // functions and variables
    const [auth, setAuth] = useState(false);

    return(
        <Context.Provider value={{auth}}>
            {children}
        </Context.Provider>
    )
}    

export default Provider;

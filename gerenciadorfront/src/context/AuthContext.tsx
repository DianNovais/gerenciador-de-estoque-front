import { createContext, ReactNode, useState } from "react";
import { getTokenAuthorization } from "../utils/handleCookies";


// define types
type Props = {
    children: ReactNode
}
type ContextType = {
    auth: boolean,
    verifyToken: () => boolean
}



export const Context = createContext<ContextType | undefined>(undefined);

const Provider = ({children}: Props) => {

    // functions and variables
    const [auth, setAuth] = useState(false);

    const verifyToken = () => {
        const token = getTokenAuthorization();

        if(token){
            setAuth(true);
            return true
        }else{
            setAuth(false);
            return false;
        }
    }

    return(
        <Context.Provider value={{auth, verifyToken}}>
            {children}
        </Context.Provider>
    )
}    

export default Provider;

import { createContext, useState, useEffect } from "react";
import {io} from "socket.io-client"; 

export const SocketContext = createContext(); 

export const SocketContextProvider = ({ children }) => {
    const [socket, setsocket] = useState( null); 

    useEffect(() => {
        setsocket(io("http://localhost:4000"));
    }, []) 


    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
};
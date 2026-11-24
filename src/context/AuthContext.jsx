import { createContext, useContext, useState } from "react";

export const authContext=createContext();

export const AuthProvider=({ children }) => {

    const [user, setUser]=useState(() => {
        const loginuser=localStorage.getItem("loginuser");
        return loginuser? JSON.parse(loginuser):null;
    });

    return (
        <authContext.Provider value={{ user, setUser }}>
            {children}
        </authContext.Provider>
    );
};

export const useAuth=() => {
    return useContext(authContext);
};
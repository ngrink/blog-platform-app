import React, { createContext, useCallback, useContext, useState } from "react";


export const AuthContext = createContext({
    isAuth: false,
    auth: null,
    setAuth: () => {},
    resetAuth: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") || false);
    const [auth, setAuthData] = useState(localStorage.getItem("auth") || null);

    const setAuth = useCallback((data) => {
        setIsAuth(true);
        setAuthData(data);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("auth", data);
    }, []);

    const resetAuth = useCallback(() => {
        setIsAuth(false);
        setAuthData(null);
        localStorage.removeItem("isAuth");
        localStorage.removeItem("auth");
    }, []);

    return (
        <AuthContext.Provider value={{auth, isAuth, setAuth, resetAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

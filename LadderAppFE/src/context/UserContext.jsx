import { createContext, useContext, useState, useEffect } from "react";
import httpClient from "../httpClient";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] =useState(null)

    const getUser = async () => {
        try {
            const resp = await httpClient.get("//localhost:5000/@me");
            setUser(resp.data)
          } catch (error) {
            console.log(error)
          } finally {
            setLoading(false)
          }
    }
    
    useEffect(() => {
        getUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, loading}}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context;
}

export { UserContext, UserProvider, useUser }
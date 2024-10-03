import { createContext, useContext, useState, useEffect } from "react";
import httpClient from "../httpClient";

const RanksContext = createContext();

const RanksProvider = ({ children }) => {
    const [ranks, setRanks] = useState([])

    const fetchRanks = async () => {
        try {
          const resp = await httpClient.get("http://localhost:5000/ranks_for_user");
          setRanks(resp.data);
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        fetchRanks();
    }, [])
    
    const value = { ranks, setRanks };

    return (
        <RanksContext.Provider value={value}>
            {children}
        </RanksContext.Provider>
    )
}

const useRanks = () => {
    const context = useContext(RanksContext);
    if (!context) {
        throw new Error("useRanks must be used within a RanksProvider")
    }
    return context;
}

export { RanksContext, RanksProvider, useRanks }
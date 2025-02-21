"use client";
import { createContext, useContext } from "react";
import useSWR from "swr";
import { fetcher } from "@/hooks/userhooks";

const UserContext = createContext(null);

export const UserProvider = ({ children }: {children:React.ReactNode}) => {
    const { data: user } = useSWR('/api/user', fetcher);
    console.log(user)
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

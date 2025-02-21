import { ReactNode } from "react";
import { UserProvider } from "../UserContext";
const Layout = ({ children }: { children: ReactNode }) => { 
    return (
        <UserProvider>
            <div className="bg-red-500">adnsdmas.</div>
            {children}
        </UserProvider>

    );
}
export default Layout
import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    
    const [user, setUser] = useState({
        email: "",
        fullName: {
            firstName: "",
            lastName: "",
        },
    });

    return (
        <div>
            {/* //array [] and {} are two different stuff and not interchangeable */}
            <UserDataContext.Provider value={{user, setUser}}>
                {children}
            </UserDataContext.Provider>
        </div>
    );
};

export default UserContext;

// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};

// UserProvider component
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({ id: 1 }); // Initialize with a dummy user

    // Add logic to update currentUser based on your application's needs

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

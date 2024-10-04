// src/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap around the app
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store logged-in user data here

    // Function to log in the user by fetching data from the fake server
    const loginUser = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${userId}`);
            setUser(response.data); // Set the user data in context
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Function to update user scores
    // const updateUserScores = async (newScore) => {
    //     if (!user) return; // Ensure user is available

    //     try {
    //         const updatedUserData = {
    //             ...user,
    //             scores: [...user.scores, newScore],  // Add new score to scores array
    //         };

    //         // Send the updated user data back to the server
    //         await axios.put(`http://localhost:3001/users/${user.id}`, updatedUserData);
    //         setUser(updatedUserData); // Update user state in context
    //     } catch (error) {
    //         console.error('Error updating user scores:', error);
    //     }
    // };

    return (
        <UserContext.Provider value={{ user, setUser, loginUser }}>
            {children}
        </UserContext.Provider>
    );
};

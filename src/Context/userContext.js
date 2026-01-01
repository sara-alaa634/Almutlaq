import React, { createContext, useContext, useState, useEffect } from "react";
import { getID } from "../Services/LocalStorageVaraibles";
import { useUsers } from "../Hooks/useUsers";
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const { fetchLoggedUserProfile } = useUsers();
  
  useEffect(() => {
    loadUser();
  }, []);

  const loadUserID = () => {
    const storedUserId = getID();
    if (storedUserId) {
      setUserId(storedUserId);
    }
    return storedUserId;
  };
  
  const fetchUserData = async () => {
    try {
      const response = await fetchLoggedUserProfile();
      setUserData(response);
    } catch (error) {
      // console.error('❌ Error fetching user profile:', error);
      // Don't block the app if user profile fetch fails
      setUserData(null);
    }
  };
  
  const loadUser = async () => {
    try {
      const userID = await loadUserID();
      if (userID) {
        await fetchUserData(userID);
      } else {
        // console.log('ℹ️ No user ID found, skipping profile fetch');
      }
    } catch (error) {
      // console.error('❌ Error in loadUser:', error);
      // Don't block the app
    }
  };

  return (
    <UserContext.Provider value={{ userId, userData,setUserData, loadUserID }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

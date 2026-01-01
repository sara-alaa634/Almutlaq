import React, { useEffect,createContext, useContext, useState } from "react";
import { getPermissons } from "../Services/PermissionsService";
import LogoLoader from '../helpers/loader'
const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(null); // Initially `null`
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPermissions();
    
    // Fallback: Force loading to false after 3 seconds if still loading
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []);

  const loadPermissions = () => {
    try {
      const storedPermissions = getPermissons();
      setPermissions(storedPermissions);
      setLoading(false); // Set loading to false once permissions are fetched
    } catch (error) {
      setPermissions([]);
      setLoading(false);
    }
  };
  const handleLogin = () => {
    loadPermissions();
  };

  const handleLogout = () => {
    setPermissions([]);
  };


  if (loading) {
    return <LogoLoader loading={loading}/>; // Render a loader while permissions are fetched
  }

  return (
    <PermissionsContext.Provider
      value={{ permissions, loading,handleLogin, handleLogout }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => {
  return useContext(PermissionsContext);
};

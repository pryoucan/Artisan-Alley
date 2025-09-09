// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the context
const AuthContext = createContext();

// 2. Create and EXPORT the AuthProvider component
// The "export" keyword here is the fix.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for user in localStorage when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // The value provided to consuming components
  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 7. Create and EXPORT a custom hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiLogin } from '../api';

const AuthContext = createContext();

// Custom hook for using the auth context
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if the user is already logged in when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Wrapped apiLogin call to maintain the authentication state
  const login = (email, password) => {
    return apiLogin(email, password) // Call the apiLogin function from api.js
      .then(data => {
        localStorage.setItem('token', data.token); // Assuming 'data' has a 'token'
        setIsAuthenticated(true);
        return data; 
      });
  };

  // Log out the user
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  // The value that will be given to the context consumers
  const value = {
    isAuthenticated,
    login, 
    logout
  };

 
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const login = (userId) => { // Modify login function to accept userId
    setUserId(userId);
};

const logout = () => {
    setUserId(null);
};

return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);

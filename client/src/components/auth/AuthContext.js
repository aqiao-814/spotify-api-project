import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

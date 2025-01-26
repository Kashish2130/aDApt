import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });
  const [userData, setUserData] = useState(() => {
    return JSON.parse(localStorage.getItem("userData")) || null;
  });
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return (
      localStorage.getItem("token") &&
      localStorage.getItem("isLoggedIn") === "true"
    );
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") || "";
  });

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("isAdmin", isAdmin);
  }, [token, userData, isLoggedIn]);

  const logIn = (token, userData, isLoggedIn, isAdmin) => {
    setToken(token);
    setUserData(userData);
    setLoggedIn(isLoggedIn);
    setIsAdmin(isAdmin);
  };

  const logout = () => {
    setToken("");
    setUserData(null);
    setLoggedIn(false);
    setIsAdmin(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userData,
        isLoggedIn,
        isAdmin,
        logIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };

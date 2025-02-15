import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("token") || "";
  });
  const [userData, setUserData] = useState(() => {
    return JSON.parse(sessionStorage.getItem("userData")) || null;
  });

  const [isLoggedIn, setLoggedIn] = useState(() => {
    return (
      sessionStorage.getItem("token") &&
      JSON.parse(sessionStorage.getItem("isLoggedIn") || "false")
    );
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isAdmin") || "false");
  });

  useEffect(() => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userData", JSON.stringify(userData));
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
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
    sessionStorage.clear();
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

import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("token") || "";
  });

  const [userData, setUserData] = useState(() => {
    try {
      const data = sessionStorage.getItem("userData");
      return data && data !== "undefined" ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  });

  const [isLoggedIn, setLoggedIn] = useState(() => {
    try {
      const data = sessionStorage.getItem("isLoggedIn");
      return data && data !== "undefined" ? JSON.parse(data) : false;
    } catch (e) {
      return false;
    }
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      const data = sessionStorage.getItem("isAdmin");
      return data && data !== "undefined" ? JSON.parse(data) : false;
    } catch (e) {
      return false;
    }
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

import React, { createContext, useEffect, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });
  const [id, setId] = useState(() => {
    return localStorage.getItem("id") || "";
  });
  const [name, setname] = useState(() => {
    return localStorage.getItem("name") || "";
  });
  const [emailId, setEmailId] = useState(() => {
    return localStorage.getItem("emailId") || "";
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("emailId", emailId);
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("isAdmin", isAdmin);
  }, [token, id, name, emailId, isLoggedIn, isAdmin]);

  const login = (token, id, name, emailId, isLoggedIn, isAdmin) => {
    setToken(token);
    setId(id);
    setname(name);
    setEmailId(emailId);
    setLoggedIn(isLoggedIn);
    setIsAdmin(isAdmin);
  };

  // Logout function
  const logout = () => {
    setToken("");
    setname("");
    setEmailId("");
    setLoggedIn(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        setLoggedIn,
        isAdmin,
        setIsAdmin,
        id,
        setId,
        name,
        setname,
        emailId,
        setEmailId,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
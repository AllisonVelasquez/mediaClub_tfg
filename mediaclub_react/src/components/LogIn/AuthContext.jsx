import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const logIn = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/LogIn");
  };

  useEffect(() => {
    const syncLogout = (event) => {
      if (event.key === "token" && !event.newValue) {
        setToken(null);
        navigate("/LogIn");
      }
    };
    window.addEventListener("storage", syncLogout);
    return () => window.removeEventListener("storage", syncLogout);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

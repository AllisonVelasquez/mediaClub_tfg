import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./LogIn/AuthContext"; 

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/LogIn" replace />;
};

export default PrivateRoute;

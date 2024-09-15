import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const checkAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  const storedSessionValid = JSON.parse(
    window.localStorage.getItem("IsSessionValid")
  );
  if (user !== null && storedSessionValid) {
    return <Navigate to="/genesisio/dashboard" />;
  }

  return children;
};

export default checkAuth;

import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const checkAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const storedUser = () => {
    try {
      return (
        JSON.parse(window.localStorage.getItem("genesisio_user")) ||
        user ||
        null
      );
    } catch (error) {
      console.error("Error reading user from local storage", error);
      return null;
    }
  };
  useEffect(() => {
    if (storedUser()) {
      navigate("/genesisio/dashboard");
    }
  }, [storedUser, user]);

  return children;
};

export default checkAuth;

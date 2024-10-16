import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";
const checkAdmin = ({ children }) => {
  const { admin } = useContext(AdminContext);
  const navigate = useNavigate();
  const storedAdmin = () => {
    try {
      return (
        JSON.parse(window.localStorage.getItem("genesisioStoredAdmin")) ||
        admin ||
        null
      );
    } catch (error) {
      console.error("Error reading admin from local storage", error);
      return null;
    }
  };
  useEffect(() => {
    if (storedAdmin()) {
      navigate("/admin/dashboard");
    }
  }, [storedAdmin, admin]);
  return children;
};

export default checkAdmin;

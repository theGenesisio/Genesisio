import React, { useContext} from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";
const checkAdmin = ({ children }) => {
  const { admin } = useContext(AdminContext);
  const storedSessionValid = JSON.parse(
    window.localStorage.getItem("adminSession")
  );
  console.log(storedSessionValid);
  if (admin !== null && storedSessionValid) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

export default checkAdmin;

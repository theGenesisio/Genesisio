import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";

const ProtectedRoute = ({ children }) => {
  const { admin, setAdmin } = useContext(AdminContext);
  const storedSessionValid = JSON.parse(
    window.localStorage.getItem("adminSession")
  );
  useEffect(() => {
    const authChecker = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_ADMIN}/auth/check-session`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.statusCode === 200) {
        window.localStorage.setItem("adminSession", JSON.stringify(true));
        window.localStorage.setItem(
          "genesisioStoredAdmin",
          JSON.stringify(data.admin)
        );
        setAdmin(data.user);
      } else if (data.statusCode === 204) {
        console.log("client attempted");
      } else {
        window.localStorage.setItem("adminSession", JSON.stringify(false));
        window.localStorage.removeItem("genesisioStoredAdmin");
        setAdmin(null);
      }
    };

    authChecker(); // Initial session check
    const intervalId = setInterval(authChecker, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);
  if (admin === null || !storedSessionValid) {
    return <Navigate to="/admin/auth/sign-in" />;
  }
  return children;
};
export default ProtectedRoute;

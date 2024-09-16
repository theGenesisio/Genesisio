import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const storedSessionValid = JSON.parse(
    window.localStorage.getItem("IsSessionValid")
  );
useEffect(() => {
  const authChecker = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/auth/check-session`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data.statusCode === 200) {
      window.localStorage.setItem("IsSessionValid", JSON.stringify(true));
        window.localStorage.setItem(
          "genesisio_user",
          JSON.stringify(data.user)
        );
        setUser(data.user);
      } else if (data.statusCode === 204) {
        console.log("Admin attempted");
      } else {
        window.localStorage.setItem("IsSessionValid", JSON.stringify(false));
        window.localStorage.removeItem("genesisio_user");
        setUser(null);
      }
    };

    authChecker(); // Initial session check
    const intervalId = setInterval(authChecker, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);
  
  if (user === null || !storedSessionValid) {
    return <Navigate to="/auth/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;

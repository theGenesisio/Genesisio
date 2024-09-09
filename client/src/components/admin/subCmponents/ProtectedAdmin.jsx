import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";

const ProtectedRoute = ({ children }) => {
  const { admin, setAdmin } = useContext(AdminContext);
  const [isSessionValid, setIsSessionValid] = useState(true);

  useEffect(() => {
    const authChecker = setInterval(async () => {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_ADMIN}/auth/check-session`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.statusCode !== 200) {
        setIsSessionValid(false);
        setAdmin(null);
      }
    }, 180000); // Check every minute
    return () => clearInterval(authChecker);
  }, []);
  if (!admin || !isSessionValid) {
    return <Navigate to="/admin/auth/sign-in" />;
  }
  return children;
};
export default ProtectedRoute;

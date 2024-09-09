import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [isSessionValid, setIsSessionValid] = useState(true);

  useEffect(() => {
    const authChecker = setInterval(async () => {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/auth/check-session`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.statusCode !== 200) {
        setIsSessionValid(false);
        setUser(null); // Clear user context
      }
    }, 180000); // Check every minute
    return () => clearInterval(authChecker);
  }, []);
  if (!user || !isSessionValid) {
    return <Navigate to="/auth/sign-in" />;
  }
  return children;
};
export default ProtectedRoute;
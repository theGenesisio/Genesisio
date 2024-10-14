import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const admin = () => {
    try {
      return (
        JSON.parse(window.localStorage.getItem("genesisioStoredAdmin")) || null
      );
    } catch (error) {
      console.error("Error reading local storage", error);
      return null;
    }
  };
  const storedSessionValid = () => {
    try {
      return JSON.parse(window.localStorage.getItem("adminSession"));
    } catch (error) {
      console.error("Error reading local storage", error);
      return false;
    }
  };

  useEffect(() => {
    if (!admin() || !storedSessionValid()) {
      navigate("/admin/auth/sign-in");
    }
  }, [storedSessionValid, admin]);
  return children;
};
export default ProtectedRoute;

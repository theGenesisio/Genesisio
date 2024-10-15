import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";

const ProtectedRoute = ({ children }) => {
  const { admin } = useContext(AdminContext);
  const navigate = useNavigate();
  const storedAdmin = () => {
    try {
      return (
        admin ||
        JSON.parse(window.localStorage.getItem("genesisioStoredAdmin")) ||
        null
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
    if (!storedAdmin() || !storedSessionValid()) {
      navigate("/admin/auth/sign-in");
    }
  }, [admin, storedSessionValid, storedAdmin]);
  return children;
};
export default ProtectedRoute;

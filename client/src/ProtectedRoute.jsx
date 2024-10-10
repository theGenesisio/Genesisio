import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const storedUser = () => {
    try {
      return JSON.parse(window.localStorage.getItem("genesisio_user")) || null;
    } catch (error) {
      console.error("Error reading local storage", error);
      return null;
    }
  };

  const sessionValid = () => {
    try {
      return JSON.parse(window.localStorage.getItem("IsSessionValid"));
    } catch (error) {
      console.error("Error reading local storage", error);
      return false;
    }
  };
  useEffect(() => {
    if (!storedUser() || !sessionValid()) {
      navigate("/auth/sign-in");
    }
  }, [sessionValid, storedUser]);

  return children;
};

export default ProtectedRoute;

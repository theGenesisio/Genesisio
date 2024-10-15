import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const storedUser = () => {
    try {
      return (
        user ||
        JSON.parse(window.localStorage.getItem("genesisio_user")) ||
        null
      );
    } catch (error) {
      console.error("Error reading user from local storage", error);
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
  }, [user, sessionValid, storedUser]);

  return children;
};

export default ProtectedRoute;

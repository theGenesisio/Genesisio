import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const checkAuth = ({ children }) => {
  const navigate = useNavigate();
  const storedUser = () => {
    try {
      return JSON.parse(window.localStorage.getItem("genesisio_user"));
    } catch (error) {
      console.error("Error reading user from local storage", error);
      return null;
    }
  };
  useEffect(() => {
    if (storedUser()) {
      navigate("/genesisio/dashboard");
    }
  }, [storedUser]);

  return children;
};

export default checkAuth;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const checkAdmin = ({ children }) => {
  const navigate = useNavigate();
  const storedAdmin = () => {
    try {
      return (
        JSON.parse(window.localStorage.getItem("genesisioStoredAdmin")) 
      );
    } catch (error) {
      console.error("Error reading admin from local storage", error);
      return null;
    }
  };
  useEffect(() => {
    if (storedAdmin()) {
      navigate("/admin/dashboard");
    }
  }, [storedAdmin]);
  return children;
};

export default checkAdmin;

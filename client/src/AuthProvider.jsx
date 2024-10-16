import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem("genesisio_user")) || null;
    } catch (error) {
      console.error("Error reading local storage", error);
      return null;
    }
  });

  useEffect(() => {
    const setNullUser = () => {
      setUser(null);
      window.localStorage.setItem("IsSessionValid", JSON.stringify(false));
      window.localStorage.removeItem("genesisio_user");
    };
    const authChecker = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API}/auth/check-session`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          setNullUser();
          console.error("Failed to check session");
        }

        const data = await response.json();

        if (data?.user) {
          setUser(data.user);
          window.localStorage.setItem("IsSessionValid", JSON.stringify(true));
          window.localStorage.setItem(
            "genesisio_user",
            JSON.stringify(data.user)
          );
        } else {
          setNullUser();
        }
      } catch (error) {
        console.error("Error during session check:", error);
        setNullUser();
      }
    };

    authChecker();
    const intervalId = setInterval(authChecker, 60 * 30 * 1000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(window.localStorage.getItem("genesisio_user"));
  const [user, setUser] = useState(storedUser || null);

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
      if (data.user) {
        window.localStorage.setItem("IsSessionValid", JSON.stringify(true));
        window.localStorage.setItem(
          "genesisio_user",
          JSON.stringify(data.user)
        );
        setUser(data.user);
      } else {
        window.localStorage.setItem("IsSessionValid", JSON.stringify(false));
        window.localStorage.removeItem("genesisio_user");
        setUser(null);
      }
    };

    authChecker(); // Check session on initial render
    const intervalId = setInterval(authChecker, 60 * 60 * 1000); // Check session every hour

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

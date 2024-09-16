import React, { createContext, useState, useEffect } from "react";

const AdminContext = createContext();

const AdminAuthProvider = ({ children }) => {
  const storedAdmin = JSON.parse(
    window.localStorage.getItem("genesisioStoredAdmin")
  );
  const [admin, setAdmin] = useState(storedAdmin || null);
  useEffect(() => {
    const authChecker = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_ADMIN}/auth/check-session`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.admin) {
        window.localStorage.setItem("adminSession", JSON.stringify(true));
        window.localStorage.setItem(
          "genesisioStoredAdmin",
          JSON.stringify(data.admin)
        );
        setAdmin(data.admin);
      }
      //  else {
      //   window.localStorage.removeItem("genesisioStoredAdmin");
      //   window.localStorage.setItem("adminSession", JSON.stringify(false));
      //   setAdmin(null);
      // }
    };
    authChecker(); // Check session on initial render
    const intervalId = setInterval(authChecker, 60 * 60 * 1000); // Check session every hour

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
export { AdminContext, AdminAuthProvider };

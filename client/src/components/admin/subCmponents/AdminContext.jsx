import React, { createContext, useState, useEffect } from "react";
const AdminContext = createContext();
const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      return (
        JSON.parse(window.localStorage.getItem("genesisioStoredAdmin")) || null
      );
    } catch (error) {
      console.error("Error reading local storage", error);
      return null;
    }
  });
  ///
  useEffect(() => {
    const isLocalStorageSupported = () => {
      try {
        const testKey = "__admintest__";
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        return true;
      } catch (error) {
        return false;
      }
    };

    if (!isLocalStorageSupported()) {
      console.error("Local storage is not supported");
      return;
    }
    const setNullAdmin = () => {
      setAdmin(null);
      window.localStorage.setItem("adminSession", JSON.stringify(false));
      window.localStorage.removeItem("genesisioStoredAdmin");
    };
    const authChecker = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_ADMIN}/auth/check-session`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          setNullAdmin();
          console.error("Failed to check admin session");
        }

        const data = await response.json();

        if (data?.admin) {
          setAdmin(data.admin);
          window.localStorage.setItem("adminSession", JSON.stringify(true));
          window.localStorage.setItem(
            "genesisioStoredAdmin",
            JSON.stringify(data.admin)
          );
        } else {
          setNullAdmin();
        }
      } catch (error) {
        console.error("Error during admin session check:", error);
        setNullAdmin();
      }
    };

    authChecker();
    const intervalId = setInterval(authChecker, 60 * 30 * 1000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);
  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
export { AdminContext, AdminAuthProvider };

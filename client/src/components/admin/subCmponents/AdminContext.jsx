import React, { createContext, useState, useEffect } from "react";

const AdminContext = createContext();

const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    const authChecker = async () => {
      await fetch(`${import.meta.env.VITE_APP_API_ADMIN}/auth/check-session`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.admin) {
            setAdmin(data.admin);
          }
        });
    };
    return () => clearInterval(authChecker);
  }, []);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
export { AdminContext, AdminAuthProvider };

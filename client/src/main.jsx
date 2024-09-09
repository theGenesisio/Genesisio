import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { AuthProvider } from "./AuthProvider.jsx";
import { AdminAuthProvider } from "./components/admin/subCmponents/AdminContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <AdminAuthProvider>
      <App />
    </AdminAuthProvider>
  </AuthProvider>
  // </React.StrictMode>
);

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const ProtectedAdminRoute = ({ children }) => {

  const { aToken } = useContext(AdminContext);

  if (!aToken) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;

};

export default ProtectedAdminRoute;
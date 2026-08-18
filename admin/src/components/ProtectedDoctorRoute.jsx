import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedDoctorRoute = ({ children }) => {

  const doctorToken = localStorage.getItem("doctorToken");

  if (!doctorToken) {
    return <Navigate to="/doctor-login" replace />;
  }

  return children;

};

export default ProtectedDoctorRoute;
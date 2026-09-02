import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";

import PortalSelection from "./pages/Portal/PortalSelection";

import AdminLogin from "./pages/Admin/AdminLogin";
import DoctorLogin from "./pages/Doctor/DoctorLogin";

import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllApointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import Doctorslist from "./pages/Admin/Doctorslist";

import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorAppointments from "./pages/Doctor/Appointments";

import AdminLayout from "./layouts/AdminLayout";
import DoctorLayout from "./layouts/DoctorLayout";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProtectedDoctorRoute from "./components/ProtectedDoctorRoute";

import DoctorForgotPassword from "./pages/Doctor/DoctorForgotPassword";
import DoctorResetPassword from "./pages/Doctor/DoctorResetPassword";

import PatientFile from "./pages/Doctor/PatientFile";
import NewConsultation from "./pages/Doctor/NewConsultation";

const App = () => {

  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem("doctorToken")
  );


  return (

    <>

      <ToastContainer />


      <Routes>


        {/* PUBLIC */}

        <Route
          path="/"
          element={<PortalSelection />}
        />


        {/* ADMIN LOGIN */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />


        {/* DOCTOR LOGIN */}

        <Route
          path="/doctor-login"
          element={
            <DoctorLogin
              setDoctorToken={setDoctorToken}
            />
          }
        />

        <Route
          path="/doctor-forgot-password"
          element={<DoctorForgotPassword />}
        />

        <Route
          path="/doctor/reset-password/:token"
          element={<DoctorResetPassword />}
        />


        {/* ADMIN */}

        <Route
          path="/admin-dashboard"
          element={

            <ProtectedAdminRoute>

              <AdminLayout>

                <Dashboard />

              </AdminLayout>

            </ProtectedAdminRoute>

          }
        />


        <Route
          path="/all-appointments"
          element={

            <ProtectedAdminRoute>

              <AdminLayout>

                <AllAppointments />

              </AdminLayout>

            </ProtectedAdminRoute>

          }
        />


        <Route
          path="/add-doctor"
          element={

            <ProtectedAdminRoute>

              <AdminLayout>

                <AddDoctor />

              </AdminLayout>

            </ProtectedAdminRoute>

          }
        />


        <Route
          path="/doctor-list"
          element={

            <ProtectedAdminRoute>

              <AdminLayout>

                <Doctorslist />

              </AdminLayout>

            </ProtectedAdminRoute>

          }
        />


        {/* DOCTOR */}

        <Route
          path="/doctor-dashboard"
          element={

            <ProtectedDoctorRoute>

              <DoctorLayout
                doctorToken={doctorToken}
                setDoctorToken={setDoctorToken}
              >

                <DoctorDashboard />

              </DoctorLayout>

            </ProtectedDoctorRoute>

          }
        />

        <Route
  path="/doctor/patient/:patientId"
  element={

    <ProtectedDoctorRoute>

      <DoctorLayout
        doctorToken={doctorToken}
        setDoctorToken={setDoctorToken}
      >

        <PatientFile />

      </DoctorLayout>

    </ProtectedDoctorRoute>

  }
/>

<Route
  path="/doctor/patient/:patientId/consultation"
  element={
    <ProtectedDoctorRoute>
      <DoctorLayout
        doctorToken={doctorToken}
        setDoctorToken={setDoctorToken}
      >
        <NewConsultation />
      </DoctorLayout>
    </ProtectedDoctorRoute>
  }
/>


        <Route
          path="/doctor-profile"
          element={

            <ProtectedDoctorRoute>

              <DoctorLayout
                doctorToken={doctorToken}
                setDoctorToken={setDoctorToken}
              >

                <DoctorProfile />

              </DoctorLayout>

            </ProtectedDoctorRoute>

          }
        />


        <Route
          path="/doctor-appointments"
          element={

            <ProtectedDoctorRoute>

              <DoctorLayout
                doctorToken={doctorToken}
                setDoctorToken={setDoctorToken}
              >

                <DoctorAppointments />

              </DoctorLayout>

            </ProtectedDoctorRoute>

          }
        />


      </Routes>

    </>

  );

};


export default App;
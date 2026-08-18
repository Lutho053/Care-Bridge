import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DoctorLayout = ({
  children,
  doctorToken,
  setDoctorToken
}) => {

  return (

    <div className="bg-[#F8F9FD] min-h-screen">

      <Navbar
        doctorToken={doctorToken}
        setDoctorToken={setDoctorToken}
      />


      <div className="flex">

        <Sidebar
          doctorToken={doctorToken}
          setDoctorToken={setDoctorToken}
        />


        <main className="flex-1">

          {children}

        </main>

      </div>

    </div>

  );

};

export default DoctorLayout;
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {

  return (

    <div className="bg-[#F8F9FD] min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1">
          {children}
        </main>

      </div>

    </div>

  );

};

export default AdminLayout;
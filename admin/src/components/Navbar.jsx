import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  doctorToken,
  setDoctorToken
}) => {

  const {
    aToken,
    setAToken
  } = useContext(AdminContext);


  const navigate = useNavigate();


  const isAdmin = Boolean(aToken);

  const isDoctor = Boolean(doctorToken);


  const logout = () => {


    if (isAdmin) {

      setAToken("");

      localStorage.removeItem("aToken");

      navigate("/admin-login");

      return;

    }


    if (isDoctor) {

      localStorage.removeItem("doctorToken");

      setDoctorToken("");

      navigate("/doctor-login");

      return;

    }

  };


  return (

    <div className="flex justify-between items-center p-4 sm:px-10 py-3 border-b bg-white">


      <div className="flex items-center gap-2 text-xs">


        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.logo}
          alt="CareBridge"
        />


        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">

          {isAdmin ? "Admin" : "Doctor"}

        </p>


      </div>


      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >

        Logout

      </button>


    </div>

  );

};


export default Navbar;
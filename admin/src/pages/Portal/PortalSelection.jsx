import React from "react";
import { useNavigate } from "react-router-dom";

const PortalSelection = () => {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center px-6">

      <div className="w-full max-w-4xl">

        {/* LOGO / HEADER */}

        <div className="text-center mb-12">

          <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
            CareBridge
          </h1>

          <p className="text-gray-500 mt-3">
            Choose your portal to continue
          </p>

        </div>


        {/* PORTAL CARDS */}

        <div className="grid md:grid-cols-2 gap-8">


          {/* DOCTOR PORTAL */}

          <div
            onClick={() => navigate("/doctor-login")}
            className="
            bg-white
            rounded-3xl
            p-10
            shadow-sm
            border
            cursor-pointer
            hover:shadow-xl
            hover:-translate-y-2
            transition
            text-center
            "
          >

            <div className="
            w-20
            h-20
            mx-auto
            bg-blue-100
            rounded-full
            flex
            items-center
            justify-center
            text-4xl
            "
            >

              👨‍⚕️

            </div>


            <h2 className="text-2xl font-bold mt-6">

              Doctor Portal

            </h2>


            <p className="text-gray-500 mt-3">

              Manage your appointments,
              profile and availability.

            </p>


            <button
              className="
              mt-6
              bg-blue-600
              text-white
              px-8
              py-3
              rounded-full
              "
            >

              Doctor Login

            </button>

          </div>



          {/* ADMIN PORTAL */}


          <div
            onClick={() => navigate("/admin-login")}
            className="
            bg-white
            rounded-3xl
            p-10
            shadow-sm
            border
            cursor-pointer
            hover:shadow-xl
            hover:-translate-y-2
            transition
            text-center
            "
          >

            <div className="
            w-20
            h-20
            mx-auto
            bg-purple-100
            rounded-full
            flex
            items-center
            justify-center
            text-4xl
            "
            >

              🛠️

            </div>


            <h2 className="text-2xl font-bold mt-6">

              Admin Portal

            </h2>


            <p className="text-gray-500 mt-3">

              Manage doctors,
              appointments and CareBridge.

            </p>


            <button
              className="
              mt-6
              bg-purple-600
              text-white
              px-8
              py-3
              rounded-full
              "
            >

              Admin Login

            </button>

          </div>


        </div>


      </div>

    </div>

  );

};


export default PortalSelection;
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

const AdminLogin = () => {

  const navigate = useNavigate();

  const { backendUrl, setAToken } = useContext(AdminContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {

    e.preventDefault();

    try {

      const { data } = await axios.post(
        backendUrl + "/api/admin/login",
        {
          email,
          password
        }
      );

      if (data.success) {

        localStorage.setItem("aToken", data.token);

        setAToken(data.token);

        toast.success("Admin login successful");

        navigate("/admin-dashboard");

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message || error.message
      );

    }

  };


  return (

    <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center px-6">

      <form
        onSubmit={loginHandler}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center text-blue-600">
          CareBridge
        </h1>

        <h2 className="text-2xl font-bold text-center mt-6">
          Admin Login
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Sign in to manage CareBridge
        </p>


        <div className="mt-8">

          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

        </div>


        <div className="mt-5">

          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

        </div>


        <button
          type="submit"
          className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>


        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full mt-4 text-gray-500"
        >
          Back to portal selection
        </button>

      </form>

    </div>

  );

};


export default AdminLogin;
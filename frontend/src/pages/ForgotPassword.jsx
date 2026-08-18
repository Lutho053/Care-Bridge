import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {

      setLoading(true);

      const { data } = await axios.post(
        `${backendUrl}/api/user/forgot-password`,
        {
          email
        }
      );

      if (data.success) {

        toast.success(data.message);

        setEmail("");

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="text-center mb-8">

            <div className="
              mx-auto
              w-16
              h-16
              rounded-2xl
              bg-blue-100
              flex
              items-center
              justify-center
              mb-5
            ">

              <span className="text-3xl">
                🔐
              </span>

            </div>

            <h1 className="
              text-3xl
              font-bold
              text-gray-900
            ">

              Forgot Password?

            </h1>

            <p className="
              mt-3
              text-gray-500
              text-sm
              leading-6
            ">

              Enter the email address linked to your
              CareBridge account and we will send you a
              password reset link.

            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2
              ">

                Email address

              </label>

              <input

                type="email"

                placeholder="you@example.com"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-transparent
                "

              />

            </div>

            <button

              type="submit"

              disabled={loading}

              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                py-3
                rounded-xl
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
              "

            >

              {loading
                ? "Sending..."
                : "Send Reset Link"
              }

            </button>

          </form>

          <div className="
            text-center
            mt-6
          ">

            <Link

              to="/login"

              className="
                text-blue-600
                hover:text-blue-700
                font-medium
                text-sm
              "

            >

              ← Back to Login

            </Link>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ForgotPassword;
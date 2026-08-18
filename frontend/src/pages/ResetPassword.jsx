import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const { data } = await axios.post(

        `${backendUrl}/api/user/reset-password/${token}`,

        {
          password
        }

      );

      if (data.success) {

        toast.success(
          data.message || "Password reset successfully"
        );

        setTimeout(() => {

          navigate("/login");

        }, 1500);

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to reset password"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="
      min-h-screen
      bg-gray-50
      flex
      items-center
      justify-center
      px-6
    ">

      <div className="w-full max-w-md">

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          p-8
        ">

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
                🔑
              </span>

            </div>

            <h1 className="
              text-3xl
              font-bold
              text-gray-900
            ">

              Reset Password

            </h1>

            <p className="
              mt-3
              text-gray-500
              text-sm
            ">

              Create a new password for your
              CareBridge account.

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

                New Password

              </label>

              <input

                type="password"

                placeholder="Enter new password"

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
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

            <div>

              <label className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2
              ">

                Confirm Password

              </label>

              <input

                type="password"

                placeholder="Confirm new password"

                value={confirmPassword}

                onChange={(e) =>
                  setConfirmPassword(e.target.value)
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
                ? "Resetting..."
                : "Reset Password"
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

export default ResetPassword;
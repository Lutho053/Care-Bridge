import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

const DoctorResetPassword = () => {

    const { token } = useParams();

    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);


    const submitHandler = async (e) => {

        e.preventDefault();


        if (!newPassword || !confirmPassword) {

            toast.error("Please fill in all fields");

            return;

        }


        if (newPassword.length < 8) {

            toast.error(
                "Password must be at least 8 characters"
            );

            return;

        }


        if (newPassword !== confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }


        try {

            setLoading(true);


            const { data } = await axios.post(

                `http://localhost:4000/api/doctor/reset-password/${token}`,

                {
                    newPassword,
                    confirmPassword
                }

            );


            if (data.success) {

                toast.success(
                    "Password reset successfully"
                );


                setTimeout(() => {

                    navigate("/doctor-login");

                }, 1200);

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

        <div className="min-h-[70vh] flex items-center justify-center px-5">

            <div className="w-full max-w-md">

                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8">

                    <div className="text-center mb-8">

                        <h1 className="text-2xl font-bold text-gray-900">

                            Create New Password

                        </h1>

                        <p className="text-gray-500 text-sm mt-2">

                            Enter a new password for your
                            CareBridge doctor account.

                        </p>

                    </div>


                    <form
                        onSubmit={submitHandler}
                        className="space-y-5"
                    >

                        <div>

                            <label className="text-sm font-medium text-gray-700">

                                New Password

                            </label>

                            <input

                                type="password"

                                value={newPassword}

                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }

                                placeholder="Enter new password"

                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    rounded-lg
                                    p-3
                                    mt-2
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "

                            />

                        </div>


                        <div>

                            <label className="text-sm font-medium text-gray-700">

                                Confirm New Password

                            </label>

                            <input

                                type="password"

                                value={confirmPassword}

                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }

                                placeholder="Confirm new password"

                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    rounded-lg
                                    p-3
                                    mt-2
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "

                            />

                        </div>


                        <p className="text-xs text-gray-500">

                            Your password must contain at least
                            8 characters.

                        </p>


                        <button

                            type="submit"

                            disabled={loading}

                            className="
                                w-full
                                bg-blue-600
                                hover:bg-blue-700
                                disabled:bg-gray-400
                                text-white
                                py-3
                                rounded-lg
                                font-medium
                                transition
                            "

                        >

                            {loading
                                ? "Resetting Password..."
                                : "Reset Password"
                            }

                        </button>

                    </form>


                    <div className="text-center mt-6">

                        <Link

                            to="/doctor-login"

                            className="text-sm text-blue-600 hover:underline"

                        >

                            ← Back to Doctor Login

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default DoctorResetPassword;
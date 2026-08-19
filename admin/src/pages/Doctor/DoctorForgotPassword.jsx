import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const DoctorForgotPassword = () => {

    const { backendUrl } = useContext(AppContext);

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {

        e.preventDefault();

        if (!email) {

            toast.error("Please enter your email");

            return;

        }

        try {

            setLoading(true);

            const { data } = await axios.post(
                `${backendUrl}/api/doctor/forgot-password`,
                {
                    email
                }
            );


            if (data.success) {

                toast.success(data.message);

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

        <div className="min-h-[70vh] flex items-center justify-center px-5">

            <div className="w-full max-w-md">

                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8">

                    <div className="text-center mb-8">

                        <h1 className="text-2xl font-bold text-gray-900">

                            Forgot Password?

                        </h1>

                        <p className="text-gray-500 text-sm mt-2">

                            Enter your doctor account email and
                            we'll send you a password reset link.

                        </p>

                    </div>


                    <form
                        onSubmit={submitHandler}
                        className="space-y-5"
                    >

                        <div>

                            <label className="text-sm font-medium text-gray-700">

                                Email Address

                            </label>

                            <input

                                type="email"

                                value={email}

                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }

                                placeholder="doctor@example.com"

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
                                ? "Sending..."
                                : "Send Reset Link"
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

export default DoctorForgotPassword;
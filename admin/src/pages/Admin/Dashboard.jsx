import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {

    const {
        backendUrl,
        aToken,
        doctors,
        getAllDoctors
    } = useContext(AdminContext);


    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);


    const getDashboardData = async () => {

        try {

            const { data } = await axios.get(
                backendUrl + "/api/admin/appointments",
                {
                    headers: {
                        aToken
                    }
                }
            );


            if (data.success) {

                setAppointments(data.appointments);

            } else {

                toast.error(data.message);

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message || error.message
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        if (aToken) {

            getAllDoctors();

            getDashboardData();

        }

    }, [aToken]);


    const totalAppointments = appointments.length;


    const pendingAppointments = appointments.filter(
        item =>
            !item.cancelled &&
            !item.isCompleted
    ).length;


    const completedAppointments = appointments.filter(
        item =>
            item.isCompleted
    ).length;


    const cancelledAppointments = appointments.filter(
        item =>
            item.cancelled
    ).length;


    const paidAppointments = appointments.filter(
        item =>
            item.payment === "paid"
    );


    const totalRevenue = paidAppointments.reduce(
        (total, item) =>
            total + Number(item.amount || 0),
        0
    );


    const recentAppointments = appointments.slice(0, 5);


    if (loading) {

        return (

            <div className="p-8">

                <p>Loading dashboard...</p>

            </div>

        );

    }


    return (

        <div className="p-8 w-full">

            {/* HEADER */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Admin Dashboard

                </h1>


                <p className="text-gray-500 mt-2">

                    Manage your CareBridge healthcare platform

                </p>

            </div>


            {/* STATISTICS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">


                {/* DOCTORS */}

                <div className="bg-white rounded-2xl p-6 shadow-sm border">

                    <p className="text-gray-500">

                        Total Doctors

                    </p>


                    <h2 className="text-3xl font-bold mt-3">

                        {doctors.length}

                    </h2>


                    <p className="text-blue-600 text-sm mt-2">

                        Registered doctors

                    </p>

                </div>


                {/* APPOINTMENTS */}

                <div className="bg-white rounded-2xl p-6 shadow-sm border">

                    <p className="text-gray-500">

                        Total Appointments

                    </p>


                    <h2 className="text-3xl font-bold mt-3">

                        {totalAppointments}

                    </h2>


                    <p className="text-blue-600 text-sm mt-2">

                        All bookings

                    </p>

                </div>


                {/* PENDING */}

                <div className="bg-white rounded-2xl p-6 shadow-sm border">

                    <p className="text-gray-500">

                        Pending Appointments

                    </p>


                    <h2 className="text-3xl font-bold mt-3">

                        {pendingAppointments}

                    </h2>


                    <p className="text-orange-500 text-sm mt-2">

                        Awaiting completion

                    </p>

                </div>


                {/* REVENUE */}

                <div className="bg-white rounded-2xl p-6 shadow-sm border">

                    <p className="text-gray-500">

                        Total Revenue

                    </p>


                    <h2 className="text-3xl font-bold mt-3">

                        R{totalRevenue}

                    </h2>


                    <p className="text-green-600 text-sm mt-2">

                        From paid appointments

                    </p>

                </div>

            </div>


            {/* SECONDARY STATISTICS */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">


                <div className="bg-white rounded-2xl p-6 border shadow-sm">

                    <p className="text-gray-500">

                        Completed

                    </p>


                    <h2 className="text-2xl font-bold text-green-600 mt-2">

                        {completedAppointments}

                    </h2>

                </div>


                <div className="bg-white rounded-2xl p-6 border shadow-sm">

                    <p className="text-gray-500">

                        Cancelled

                    </p>


                    <h2 className="text-2xl font-bold text-red-500 mt-2">

                        {cancelledAppointments}

                    </h2>

                </div>


                <div className="bg-white rounded-2xl p-6 border shadow-sm">

                    <p className="text-gray-500">

                        Available Doctors

                    </p>


                    <h2 className="text-2xl font-bold text-blue-600 mt-2">

                        {

                            doctors.filter(
                                doctor => doctor.available
                            ).length

                        }

                    </h2>

                </div>

            </div>


            {/* RECENT APPOINTMENTS */}

            <div className="bg-white rounded-2xl border shadow-sm mt-8 p-6">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-xl font-bold">

                        Recent Appointments

                    </h2>

                </div>


                <div className="space-y-4">


                    {recentAppointments.length === 0 ? (

                        <p className="text-gray-500">

                            No appointments yet.

                        </p>

                    ) : (

                        recentAppointments.map((item) => (

                            <div

                                key={item._id}

                                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4"

                            >

                                <div>

                                    <p className="font-semibold">

                                        {item.userData?.name}

                                    </p>


                                    <p className="text-sm text-gray-500">

                                        With Dr. {item.docData?.name}

                                    </p>

                                </div>


                                <div>

                                    <p className="text-sm">

                                        {item.slotDate}

                                    </p>


                                    <p className="text-sm text-gray-500">

                                        {item.slotTime}

                                    </p>

                                </div>


                                <div>

                                    {

                                        item.cancelled ? (

                                            <span className="text-red-500">

                                                Cancelled

                                            </span>

                                        ) : item.isCompleted ? (

                                            <span className="text-green-600">

                                                Completed

                                            </span>

                                        ) : (

                                            <span className="text-blue-600">

                                                Pending

                                            </span>

                                        )

                                    }

                                </div>


                            </div>

                        ))

                    )}

                </div>

            </div>


        </div>

    );

};


export default Dashboard;
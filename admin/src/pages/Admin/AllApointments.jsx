import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

const AllApointments = () => {

    const { backendUrl, aToken } = useContext(AdminContext);

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);


    const getAllAppointments = async () => {

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

            console.log(error);

            toast.error(
                error.response?.data?.message || error.message
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        if (aToken) {

            getAllAppointments();

        }

    }, [aToken]);


    if (loading) {

        return (

            <div className="p-8">

                <p>Loading appointments...</p>

            </div>

        );

    }


    return (

        <div className="p-8 w-full">

            <h1 className="text-3xl font-bold mb-8">

                All Appointments

            </h1>


            <div className="bg-white rounded-2xl shadow overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="text-left p-4">
                                    Patient
                                </th>

                                <th className="text-left p-4">
                                    Doctor
                                </th>

                                <th className="text-left p-4">
                                    Date
                                </th>

                                <th className="text-left p-4">
                                    Time
                                </th>

                                <th className="text-left p-4">
                                    Payment
                                </th>

                                <th className="text-left p-4">
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {appointments.map((item, index) => (

                                <tr
                                    key={item._id || index}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        <p className="font-medium">

                                            {item.userData?.name}

                                        </p>

                                        <p className="text-sm text-gray-500">

                                            {item.userData?.email}

                                        </p>

                                    </td>


                                    <td className="p-4">

                                        <p className="font-medium">

                                            {item.docData?.name}

                                        </p>

                                        <p className="text-sm text-gray-500">

                                            {item.docData?.speciality}

                                        </p>

                                    </td>


                                    <td className="p-4">

                                        {item.slotDate}

                                    </td>


                                    <td className="p-4">

                                        {item.slotTime}

                                    </td>


                                    <td className="p-4">

                                        <span
                                            className={
                                                item.payment === "paid"
                                                    ? "text-green-600"
                                                    : "text-orange-500"
                                            }
                                        >

                                            {item.payment === "paid"
                                                ? "Paid"
                                                : "Pending"}

                                        </span>

                                    </td>


                                    <td className="p-4">

                                        {item.cancelled ? (

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

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                {appointments.length === 0 && (

                    <p className="p-8 text-center text-gray-500">

                        No appointments found.

                    </p>

                )}

            </div>

        </div>

    );

};


export default AllApointments;
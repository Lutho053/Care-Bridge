import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const DoctorDashboard = () => {

    const [doctor,setDoctor] = useState(null);
    const [appointments,setAppointments] = useState([]);
    const [earnings,setEarnings] = useState(0);

    const [loading, setLoading] = useState(true);


    const getDashboard = async () => {

        try {

            const token = localStorage.getItem("doctorToken");


            const { data } = await axios.post(
                "http://localhost:4000/api/doctor/dashboard",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            if(data.success){

    setDoctor(data.doctor);


    // Calculate earnings from completed appointments

    const completedAppointments =
        data.appointments.filter(
            appointment =>
                appointment.isCompleted &&
                !appointment.cancelled
        );


    const totalEarnings =
        completedAppointments.reduce(
            (total, appointment) =>
                total + Number(appointment.amount || 0),
            0
        );


    setEarnings(totalEarnings);


    const activeAppointments = data.appointments.filter(
    appointment =>
        !appointment.isCompleted &&
        !appointment.cancelled
);

setAppointments(activeAppointments);


}else{

    toast.error(data.message);

}


        } catch (error) {

            toast.error(error.message);

        } finally {

            setLoading(false);

        }

    };


    const changeAvailability = async () => {

        try {

            const token = localStorage.getItem("doctorToken");


            const { data } = await axios.post(

                "http://localhost:4000/api/doctor/change-availability",

                {
                    docId: doctor._id
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            if (data.success) {

                toast.success(data.message);

                getDashboard();

            } else {

                toast.error(data.message);

            }


        } catch (error) {

            toast.error(error.message);

        }

    };


    const updateAppointment = async (id, status) => {

        try {

            const token = localStorage.getItem("doctorToken");


            const { data } = await axios.post(

                "http://localhost:4000/api/doctor/update-appointment",

                {
                    appointmentId: id,
                    status
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            if (data.success) {

                toast.success(data.message);

                getDashboard();

            } else {

                toast.error(data.message);

            }


        } catch (error) {

            toast.error(error.message);

        }

    };


    useEffect(() => {

        getDashboard();

    }, []);


    if (loading) {

        return (

            <div className="p-8">

                Loading dashboard...

            </div>

        );

    }


    return (

        <div className="flex min-h-screen bg-gray-50">


            {/* MAIN */}

            <div className="flex-1 p-8">


                <h1 className="text-3xl font-bold mb-8">

                    Doctor Dashboard

                </h1>


                {/* DOCTOR CARD */}

                {doctor && (

                    <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6 mb-8">


                        <img

                            src={doctor.image}

                            alt={doctor.name}

                            className="w-24 h-24 rounded-full object-cover"

                        />


                        <div>

                            <h2 className="text-xl font-bold">

                                {doctor.name}

                            </h2>


                            <p className="text-blue-600">

                                {doctor.speciality}

                            </p>


                            <p className="text-gray-500">

                                {doctor.email}

                            </p>


                            <button

                                onClick={changeAvailability}

                                className={`mt-4 px-6 py-2 rounded-full text-white ${
                                    doctor.available
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}

                            >

                                {doctor.available
                                    ? "Available 🟢"
                                    : "Not Available 🔴"}

                            </button>


                        </div>


                    </div>

                )}


                {/* STATS */}

                <div className="grid md:grid-cols-3 gap-6 mb-10">


                    {/* ACTIVE APPOINTMENTS */}

                    <div className="bg-white p-6 rounded-2xl shadow">

                        <h2 className="text-3xl font-bold">

                            {appointments.length}

                        </h2>


                        <p className="text-gray-500">

                            Upcoming Appointments

                        </p>

                    </div>


                    {/* EARNINGS */}

                    <div className="bg-white p-6 rounded-2xl shadow">

                        <h2 className="text-3xl font-bold">

                            R{earnings}

                        </h2>


                        <p className="text-gray-500">

                            Earnings

                        </p>

                    </div>


                    {/* STATUS */}

                    <div className="bg-white p-6 rounded-2xl shadow">

                        <h2 className="text-3xl font-bold">

                            {doctor?.available
                                ? "Online"
                                : "Offline"}

                        </h2>


                        <p className="text-gray-500">

                            Status

                        </p>

                    </div>


                </div>


                {/* APPOINTMENTS */}

                <h2 className="text-2xl font-bold mb-5">

                    Upcoming Appointments

                </h2>


                {appointments.length === 0 ? (

                    <div className="bg-white rounded-xl shadow p-8 text-center">

                        <p className="text-gray-500">

                            No upcoming appointments.

                        </p>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 gap-5">


                        {appointments.map((item) => (

                            <div

                                key={item._id}

                                className="bg-white rounded-xl shadow p-5"

                            >

                                <h3 className="font-bold text-lg">

                                    {item.userData?.name || "Patient Appointment"}

                                </h3>


                                <p className="text-gray-500">

                                    {item.userData?.email}

                                </p>


                                <div className="mt-4">

                                    <p>

                                        <b>Date:</b> {item.slotDate}

                                    </p>


                                    <p>

                                        <b>Time:</b> {item.slotTime}

                                    </p>


                                    <p>

                                        <b>Payment:</b>{" "}

                                        {item.payment === "paid"
                                            ? "Paid"
                                            : "Pending"}

                                    </p>


                                    <p>

                                        <b>Amount:</b> R{item.amount}

                                    </p>

                                </div>


                                <div className="flex gap-3 mt-5">


                                    <button

                                        onClick={() =>
                                            updateAppointment(
                                                item._id,
                                                "completed"
                                            )
                                        }

                                        className="bg-green-500 text-white px-4 py-2 rounded"

                                    >

                                        Complete

                                    </button>


                                    <button

                                        onClick={() =>
                                            updateAppointment(
                                                item._id,
                                                "cancelled"
                                            )
                                        }

                                        className="bg-red-500 text-white px-4 py-2 rounded"

                                    >

                                        Cancel

                                    </button>


                                </div>


                            </div>

                        ))}


                    </div>

                )}


            </div>


        </div>

    );

};


export default DoctorDashboard;
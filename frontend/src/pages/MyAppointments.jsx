import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {

  const {
    backendUrl,
    token,
    getDoctorsData
  } = useContext(AppContext);


  const [appointments, setAppointments] = useState([]);


  const formatSlotDate = (slotDate) => {

    if (!slotDate) return "Invalid date";

    const [day, month, year] = slotDate.split("_").map(Number);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return `${day} ${monthNames[month - 1]} ${year}`;

  };


  const formatTimeAMPM = (time24) => {

    if (!time24) return "";

    const [hour, minute] = time24.split(":").map(Number);

    const ampm = hour >= 12 ? "PM" : "AM";

    const hour12 = hour % 12 === 0 ? 12 : hour % 12;

    return `${hour12}:${minute
      .toString()
      .padStart(2, "0")} ${ampm}`;

  };


  const getUserAppointments = async () => {

    try {

      const { data } = await axios.get(
        `${backendUrl}/api/user/appointments`,
        {
          headers: { token }
        }
      );


      if (data.success) {

        setAppointments(data.appointments);

      }

    } catch {

      toast.error("Failed to load appointments");

    }

  };


  const payNow = async (appointmentId) => {

    try {

      const { data } = await axios.post(

        `${backendUrl}/api/payfast/create`,

        { appointmentId },

        { headers: { token } }

      );


      if (data.success) {

        window.location.href = data.paymentUrl;

      } else {

        toast.error(
          data.message || "Could not start payment"
        );

      }

    } catch {

      toast.error("Payment error");

    }

  };


  const cancelAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.post(

        `${backendUrl}/api/user/cancel-appointment`,

        { appointmentId },

        { headers: { token } }

      );


      if (data.success) {

        toast.success(data.message);

        await getUserAppointments();

        await getDoctorsData();

      } else {

        toast.error(data.message);

      }

    } catch {

      toast.error("Error cancelling appointment");

    }

  };


  useEffect(() => {

    if (token) {

      getUserAppointments();

    }

  }, [token]);


  const getAppointmentStatus = (appointment) => {

    if (appointment.cancelled) {

      return {
        text: "Cancelled",
        className: "bg-red-100 text-red-600"
      };

    }


    if (appointment.isCompleted) {

      return {
        text: "Completed",
        className: "bg-green-100 text-green-600"
      };

    }


    return {
      text: "Pending",
      className: "bg-yellow-100 text-yellow-600"
    };

  };


  const getPaymentStatus = (appointment) => {

    if (appointment.payment) {

      return {
        text: "Paid",
        className: "text-green-600"
      };

    }


    if (appointment.paymentMethod === "cash") {

      return {
        text: "Cash payment",
        className: "text-orange-600"
      };

    }


    if (appointment.paymentMethod === "medical_aid") {

      return {
        text: "Medical aid",
        className: "text-purple-600"
      };

    }


    return {
      text: "Pending payment",
      className: "text-red-600"
    };

  };


  return (

    <div className="pt-12 pb-16">


      <div className="flex justify-between items-center border-b mb-6 pb-3">

        <p className="font-medium text-zinc-700">

          My Appointments

        </p>


        <span className="text-sm text-gray-500">

          {appointments.length} appointment(s)

        </span>

      </div>


      <div className="space-y-5">


        {appointments.length === 0 && (

          <div className="bg-white border rounded-2xl p-10 text-center">

            <h2 className="text-xl font-semibold">

              No appointments yet

            </h2>

            <p className="text-gray-500 mt-2">

              Your booked appointments will appear here.

            </p>

          </div>

        )}


        {appointments.map((item) => {

          const appointmentStatus =
            getAppointmentStatus(item);


          const paymentStatus =
            getPaymentStatus(item);


          return (

            <div

              key={item._id}

              className="
              bg-white
              rounded-2xl
              border
              shadow-sm
              p-5
              "

            >


              <div className="flex flex-col lg:flex-row gap-6">


                <img

                  className="
                  w-full
                  lg:w-40
                  h-40
                  object-cover
                  bg-indigo-50
                  rounded-xl
                  "

                  src={item.docData.image}

                  alt={item.docData.name}

                />


                <div className="flex-1">


                  <div className="flex flex-col sm:flex-row sm:justify-between gap-3">


                    <div>

                      <h2 className="text-xl font-bold text-gray-800">

                        {item.docData.name}

                      </h2>


                      <p className="text-blue-600 mt-1">

                        {item.docData.speciality}

                      </p>

                    </div>


                    <span

                      className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-medium
                      w-fit
                      ${appointmentStatus.className}
                      `}

                    >

                      {appointmentStatus.text}

                    </span>


                  </div>


                  <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">


                    <div>

                      <p className="text-xs text-gray-500">

                        Date

                      </p>

                      <p className="font-medium">

                        {formatSlotDate(item.slotDate)}

                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-gray-500">

                        Time

                      </p>

                      <p className="font-medium">

                        {formatTimeAMPM(item.slotTime)}

                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-gray-500">

                        Payment

                      </p>

                      <p className={`font-medium ${paymentStatus.className}`}>

                        {paymentStatus.text}

                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-gray-500">

                        Amount

                      </p>

                      <p className="font-medium">

                        R{item.amount}

                      </p>

                    </div>


                  </div>


                  <div className="mt-5 text-sm text-gray-500">

                    <p>

                      {item.docData.address?.line1}

                    </p>

                    <p>

                      {item.docData.address?.line2}

                    </p>

                  </div>


                  <div className="flex flex-wrap gap-3 mt-6">


                    {!item.cancelled &&
                    !item.isCompleted &&
                    !item.payment &&
                    item.paymentMethod === "online" && (

                      <button

                        onClick={() => payNow(item._id)}

                        className="
                        bg-blue-600
                        text-white
                        px-6
                        py-2
                        rounded-full
                        hover:bg-blue-700
                        transition
                        "

                      >

                        Pay Online

                      </button>

                    )}


                    {!item.cancelled &&
                    !item.isCompleted && (

                      <button

                        onClick={() =>
                          cancelAppointment(item._id)
                        }

                        className="
                        border
                        border-red-500
                        text-red-500
                        px-6
                        py-2
                        rounded-full
                        hover:bg-red-500
                        hover:text-white
                        transition
                        "

                      >

                        Cancel Appointment

                      </button>

                    )}


                    {item.paymentMethod === "cash" &&
                    !item.payment && (

                      <span className="
                      bg-orange-100
                      text-orange-600
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      ">

                        Pay at appointment

                      </span>

                    )}


                    {item.paymentMethod === "medical_aid" &&
                    !item.payment && (

                      <span className="
                      bg-purple-100
                      text-purple-600
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      ">

                        Medical aid verification required

                      </span>

                    )}


                    {item.cancelled && (

                      <span className="
                      text-red-500
                      font-medium
                      ">

                        Appointment Cancelled

                      </span>

                    )}


                    {item.isCompleted && (

                      <span className="
                      text-green-600
                      font-medium
                      ">

                        Appointment Completed

                      </span>

                    )}

                  </div>


                </div>


              </div>


            </div>

          );

        })}


      </div>


    </div>

  );

};


export default MyAppointments;
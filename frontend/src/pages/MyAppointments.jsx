import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const formatSlotDate = (slotDate) => {
    if (!slotDate) return "Invalid date";
    const [day, month, year] = slotDate.split("_").map(Number);
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    return `${day} ${monthNames[month - 1]} ${year}`;
  };

  const formatTimeAMPM = (time24) => {
    if (!time24) return "";
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) setAppointments(data.appointments.reverse());
    } catch (error) {
      toast.error("Failed to load appointments");
    }
  };

  const cancelAppointments = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await getDoctorsData(); // refresh slot data
        await getUserAppointments(); // make sure to await this!
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error cancelling appointment");
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="pt-12">
      <p className="pb-3 font-medium text-zinc-700 border-b mb-4">My appointments</p>
      <div className="space-y-4">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 p-4 border border-zinc-200 rounded-md shadow-sm"
          >
            <div>
              <img className="w-32 bg-indigo-50 rounded" src={item.docData.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="mt-1">
                <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>{" "}
                {formatSlotDate(item.slotDate)} | {formatTimeAMPM(item.slotTime)}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && (
                <button className="text-sm py-2 px-4 border border-gray-300 rounded hover:bg-primary hover:text-white transition">
                  Pay Online
                </button>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointments(item._id)}
                  className="text-sm py-2 px-4 border border-gray-300 rounded hover:bg-red-600 hover:text-white transition"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500" disabled>
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;


import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Appointments = () => {

  const { backendUrl } = useContext(AppContext);

  const navigate = useNavigate();

  

  const [appointments, setAppointments] = useState([]);


  const getAppointments = async () => {

    try {

      const token = localStorage.getItem("doctorToken");

      const { data } = await axios.post(

        `${backendUrl}/api/doctor/dashboard`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );


      if (data.success) {

        setAppointments(data.appointments);

      } else {

        toast.error(data.message);

      }


    } catch (error) {

      toast.error(error.message);

    }

  };


  useEffect(() => {

    getAppointments();

  }, []);


  const viewPatientFile = (patientId, appointmentId) => {
  navigate(
    `/doctor/patient/${patientId}?appointmentId=${appointmentId}`
  );
};


  return (

    <div className="p-8 w-full">


      <h1 className="text-3xl font-bold mb-8">

        Appointments

      </h1>



      <div className="space-y-5">


        {appointments.map((item, index) => (

          <div

            key={index}

            className="
              bg-white
              rounded-2xl
              shadow
              p-6
              border
            "

          >


            {/* HEADER */}

            <div className="flex justify-between items-center">


              <div>

                <h2 className="text-xl font-bold">

                  {item.userData.name}

                </h2>


                <p className="text-gray-500">

                  {item.userData.email}

                </p>

              </div>



              <div>

                {item.cancelled ? (

                  <span className="text-red-500 font-medium">

                    Cancelled

                  </span>

                ) : item.isCompleted ? (

                  <span className="text-green-600 font-medium">

                    Completed

                  </span>

                ) : (

                  <span className="text-blue-600 font-medium">

                    Pending

                  </span>

                )}

              </div>


            </div>



            {/* APPOINTMENT DETAILS */}

            <div className="grid md:grid-cols-4 gap-5 mt-6 text-gray-600">


              <div>

                <p className="text-sm">

                  Date

                </p>

                <b>

                  {item.slotDate}

                </b>

              </div>



              <div>

                <p className="text-sm">

                  Time

                </p>

                <b>

                  {item.slotTime}

                </b>

              </div>



              <div>

                <p className="text-sm">

                  Payment

                </p>

                <b>

                  {item.payment ? "Paid" : "Pending"}

                </b>

              </div>



              <div>

                <p className="text-sm">

                  Amount

                </p>

                <b>

                  R{item.amount}

                </b>

              </div>


            </div>



            {/* PATIENT FILE */}

            <div className="mt-6 pt-5 border-t flex justify-end">


              <button
  onClick={() =>
    viewPatientFile(item.userId, item._id)
  }
  className="
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-6
    py-3
    rounded-xl
    font-medium
    transition
  "
>
  View Patient File
</button>


            </div>


          </div>

        ))}


      </div>


    </div>

  );

};


export default Appointments;


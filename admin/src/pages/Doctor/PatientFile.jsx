
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const PatientFile = () => {

  const { patientId } = useParams();
  const [searchParams] = useSearchParams();

  const appointmentId = searchParams.get("appointmentId");

  const navigate = useNavigate();

  const { backendUrl } = useContext(AppContext);

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);


  const getPatientRecords = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("doctorToken");

      const { data } = await axios.get(

        `${backendUrl}/api/patient-records/patient/${patientId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );


      if (data.success) {

        setRecords(data.records || []);

      } else {

        toast.error(data.message);

      }


    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        error.message
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    if (patientId) {

      getPatientRecords();

    }

  }, [patientId]);


  if (loading) {

    return (

      <div className="p-8 w-full">

        <p className="text-gray-500">
          Loading patient file...
        </p>

      </div>

    );

  }


  return (

    <div className="p-8 w-full bg-gray-50 min-h-screen">


      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">


        <div>

          <button
            onClick={() => navigate("/doctor/appointments")}
            className="
              text-blue-600
              hover:text-blue-700
              font-medium
              mb-3
            "
          >
            ← Back to Appointments
          </button>


          <h1 className="text-3xl font-bold text-gray-900">

            Patient Medical File

          </h1>


          <p className="text-gray-500 mt-1">

            Consultation and medical history

          </p>

        </div>


        <button
          onClick={() =>
            navigate(
              `/doctor/patient/${patientId}/consultation?appointmentId=${appointmentId || ""}`
            )
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
          + Start Consultation
        </button>


      </div>



      {/* PATIENT INFORMATION */}

      {records.length > 0 && records[0].patientId && (

        <div className="
          bg-white
          rounded-2xl
          shadow
          p-6
          mb-8
          border
        ">

          <h2 className="text-xl font-bold mb-4">

            Patient Information

          </h2>


          <div className="grid md:grid-cols-3 gap-5">

            <div>

              <p className="text-sm text-gray-500">
                Patient ID
              </p>

              <p className="font-medium">
                {patientId}
              </p>

            </div>


            <div>

              <p className="text-sm text-gray-500">
                Medical Records
              </p>

              <p className="font-medium">
                {records.length}
              </p>

            </div>


            <div>

              <p className="text-sm text-gray-500">
                Last Consultation
              </p>

              <p className="font-medium">

                {records[0]?.consultationDate
                  ? new Date(
                      records[0].consultationDate
                    ).toLocaleDateString()
                  : "No consultation"
                }

              </p>

            </div>

          </div>

        </div>

      )}



      {/* NO RECORDS */}

      {records.length === 0 && (

        <div className="
          bg-white
          rounded-2xl
          shadow
          p-10
          text-center
          border
        ">

          <div className="text-5xl mb-4">
            🩺
          </div>


          <h2 className="text-xl font-bold text-gray-900">

            No Medical Records Yet

          </h2>


          <p className="text-gray-500 mt-2 mb-6">

            This patient does not have any consultation
            records with you yet.

          </p>


          <button
            onClick={() =>
              navigate(
                `/doctor/patient/${patientId}/consultation?appointmentId=${appointmentId || ""}`
              )
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              font-medium
            "
          >
            Start First Consultation
          </button>

        </div>

      )}



      {/* CONSULTATION HISTORY */}

      {records.length > 0 && (

        <div>

          <h2 className="text-2xl font-bold mb-5">

            Consultation History

          </h2>


          <div className="space-y-6">


            {records.map((record) => (

              <div
                key={record._id}
                className="
                  bg-white
                  rounded-2xl
                  shadow
                  border
                  p-6
                "
              >


                {/* DATE */}

                <div className="
                  flex
                  flex-col
                  md:flex-row
                  md:justify-between
                  md:items-center
                  gap-2
                  mb-6
                ">

                  <div>

                    <p className="text-sm text-gray-500">
                      Consultation Date
                    </p>

                    <h3 className="text-lg font-bold">

                      {new Date(
                        record.consultationDate
                      ).toLocaleDateString(
                        "en-ZA",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        }
                      )}

                    </h3>

                  </div>


                  {record.doctorId && (

                    <p className="text-sm text-gray-500">

                      Dr. {record.doctorId.name}

                    </p>

                  )}

                </div>



                {/* REASON */}

                {record.reasonForVisit && (

                  <div className="mb-5">

                    <p className="text-sm text-gray-500 mb-1">
                      Reason for Visit
                    </p>

                    <p className="text-gray-800">
                      {record.reasonForVisit}
                    </p>

                  </div>

                )}



                {/* DIAGNOSIS */}

                {record.diagnosis && (

                  <div className="mb-5">

                    <p className="text-sm text-gray-500 mb-1">
                      Diagnosis
                    </p>

                    <p className="text-gray-800">
                      {record.diagnosis}
                    </p>

                  </div>

                )}



                {/* CLINICAL NOTES */}

                {record.clinicalNotes && (

                  <div className="mb-5">

                    <p className="text-sm text-gray-500 mb-1">
                      Clinical Notes
                    </p>

                    <p className="
                      text-gray-800
                      whitespace-pre-line
                    ">
                      {record.clinicalNotes}
                    </p>

                  </div>

                )}



                {/* TREATMENT */}

                {record.treatmentPlan && (

                  <div className="mb-5">

                    <p className="text-sm text-gray-500 mb-1">
                      Treatment Plan
                    </p>

                    <p className="
                      text-gray-800
                      whitespace-pre-line
                    ">
                      {record.treatmentPlan}
                    </p>

                  </div>

                )}



                {/* VITALS */}

                {record.vitals && (

                  <div>

                    <p className="text-sm text-gray-500 mb-3">
                      Vitals
                    </p>


                    <div className="
                      grid
                      grid-cols-2
                      md:grid-cols-5
                      gap-3
                    ">


                      <div className="bg-gray-50 rounded-xl p-3">

                        <p className="text-xs text-gray-500">
                          Blood Pressure
                        </p>

                        <p className="font-semibold">
                          {record.vitals.bloodPressure || "—"}
                        </p>

                      </div>


                      <div className="bg-gray-50 rounded-xl p-3">

                        <p className="text-xs text-gray-500">
                          Temperature
                        </p>

                        <p className="font-semibold">
                          {record.vitals.temperature || "—"}
                        </p>

                      </div>


                      <div className="bg-gray-50 rounded-xl p-3">

                        <p className="text-xs text-gray-500">
                          Pulse
                        </p>

                        <p className="font-semibold">
                          {record.vitals.pulse || "—"}
                        </p>

                      </div>


                      <div className="bg-gray-50 rounded-xl p-3">

                        <p className="text-xs text-gray-500">
                          Weight
                        </p>

                        <p className="font-semibold">
                          {record.vitals.weight || "—"}
                        </p>

                      </div>


                      <div className="bg-gray-50 rounded-xl p-3">

                        <p className="text-xs text-gray-500">
                          Height
                        </p>

                        <p className="font-semibold">
                          {record.vitals.height || "—"}
                        </p>

                      </div>


                    </div>

                  </div>

                )}



              </div>

            ))}


          </div>

        </div>

      )}


    </div>

  );

};


export default PatientFile;

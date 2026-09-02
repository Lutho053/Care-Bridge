import { useContext, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { AppContext } from "../../context/AppContext";

const NewConsultation = () => {
  const { backendUrl } = useContext(AppContext);

  const { patientId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const appointmentId = searchParams.get("appointmentId");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    reasonForVisit: "",
    clinicalNotes: "",
    diagnosis: "",
    treatmentPlan: "",
    bloodPressure: "",
    temperature: "",
    pulse: "",
    weight: "",
    height: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId) {
      toast.error("Patient ID is missing");
      return;
    }

    if (!appointmentId) {
      toast.error("Appointment ID is missing");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("doctorToken");

      const { data } = await axios.post(
        `${backendUrl}/api/patient-records/create`,
        {
          patientId,
          appointmentId,

          reasonForVisit: formData.reasonForVisit,
          clinicalNotes: formData.clinicalNotes,
          diagnosis: formData.diagnosis,
          treatmentPlan: formData.treatmentPlan,

          vitals: {
            bloodPressure: formData.bloodPressure,
            temperature: formData.temperature,
            pulse: formData.pulse,
            weight: formData.weight,
            height: formData.height,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Consultation saved successfully");

        navigate(
          `/doctor/patient/${patientId}?appointmentId=${appointmentId}`
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to save consultation"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            New Consultation
          </h1>

          <p className="text-gray-500 mt-2">
            Record the patient's consultation details and vitals.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/doctor/patient/${patientId}?appointmentId=${appointmentId}`
            )
          }
          className="border border-gray-300 px-5 py-2.5 rounded-xl hover:bg-gray-100 transition"
        >
          ← Back to Patient File
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Consultation Information */}
        <div className="bg-white rounded-2xl shadow border p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Consultation Information
          </h2>

          <div className="space-y-6">
            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Visit
              </label>

              <textarea
                name="reasonForVisit"
                value={formData.reasonForVisit}
                onChange={handleChange}
                rows="3"
                placeholder="Why is the patient being seen?"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Clinical Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinical Notes
              </label>

              <textarea
                name="clinicalNotes"
                value={formData.clinicalNotes}
                onChange={handleChange}
                rows="6"
                placeholder="Enter your clinical observations and consultation notes..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Diagnosis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diagnosis
              </label>

              <textarea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                rows="3"
                placeholder="Enter diagnosis..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Treatment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Treatment Plan
              </label>

              <textarea
                name="treatmentPlan"
                value={formData.treatmentPlan}
                onChange={handleChange}
                rows="5"
                placeholder="Enter recommended treatment and follow-up plan..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Vitals */}
        <div className="bg-white rounded-2xl shadow border p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Patient Vitals
          </h2>

          <p className="text-gray-500 mb-6">
            Record the patient's measurements during this consultation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blood Pressure */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Pressure
              </label>

              <input
                type="text"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleChange}
                placeholder="e.g. 120/80"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Temperature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature
              </label>

              <input
                type="text"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="e.g. 36.7 °C"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pulse */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pulse
              </label>

              <input
                type="text"
                name="pulse"
                value={formData.pulse}
                onChange={handleChange}
                placeholder="e.g. 72 bpm"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight
              </label>

              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g. 70 kg"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height
              </label>

              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="e.g. 175 cm"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() =>
              navigate(
                `/doctor/patient/${patientId}?appointmentId=${appointmentId}`
              )
            }
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-3 rounded-xl font-medium transition"
          >
            {loading ? "Saving..." : "Save Consultation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewConsultation;
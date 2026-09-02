import prescriptionModel from "../models/prescriptionModel.js";
import appointmentModel from "../models/appointmentModel.js";


// ==========================================
// DOCTOR: CREATE PRESCRIPTION
// ==========================================

const createPrescription = async (req, res) => {
  try {
    const doctorId = req.doctorId;

    const {
      patientId,
      appointmentId,
      medications,
      notes,
    } = req.body;

    if (!patientId || !appointmentId) {
      return res.json({
        success: false,
        message: "Patient and appointment are required",
      });
    }

    if (!medications || !Array.isArray(medications) || medications.length === 0) {
      return res.json({
        success: false,
        message: "At least one medication is required",
      });
    }

    // Verify that the doctor actually has
    // an appointment with this patient
    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      docId: doctorId.toString(),
      userId: patientId.toString(),
      cancelled: { $ne: true },
    });

    if (!appointment) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to prescribe for this patient",
      });
    }

    // Basic validation for every medication
    for (const medication of medications) {
      if (
        !medication.name ||
        !medication.dosage ||
        !medication.frequency ||
        !medication.duration
      ) {
        return res.json({
          success: false,
          message:
            "Each medication must have a name, dosage, frequency and duration",
        });
      }
    }

    const prescription = new prescriptionModel({
      patientId,
      doctorId,
      appointmentId,
      medications,
      notes: notes || "",
    });

    await prescription.save();

    res.json({
      success: true,
      message: "Prescription created successfully",
      prescription,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// PATIENT: GET OWN PRESCRIPTIONS
// ==========================================

const getPatientPrescriptions = async (req, res) => {
  try {
    const patientId = req.userId;

    const prescriptions = await prescriptionModel
      .find({ patientId })
      .populate("doctorId", "name speciality image")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      prescriptions,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// DOCTOR: GET PATIENT PRESCRIPTIONS
// ==========================================

const getDoctorPatientPrescriptions = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const { patientId } = req.params;

    // Confirm doctor has an appointment
    // relationship with this patient
    const appointment = await appointmentModel.findOne({
      docId: doctorId.toString(),
      userId: patientId.toString(),
      cancelled: { $ne: true },
    });

    if (!appointment) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this patient's prescriptions",
      });
    }

    const prescriptions = await prescriptionModel
      .find({
        patientId,
        doctorId,
      })
      .populate("doctorId", "name speciality image")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      prescriptions,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export {
  createPrescription,
  getPatientPrescriptions,
  getDoctorPatientPrescriptions,
};
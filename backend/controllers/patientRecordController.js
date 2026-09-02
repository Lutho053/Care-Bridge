import patientRecordModel from "../models/patientRecordModel.js";
import appointmentModel from "../models/appointmentModel.js";


// ===============================
// DOCTOR: CREATE PATIENT RECORD
// ===============================

const createPatientRecord = async (req, res) => {
  try {
    const doctorId = req.doctorId;

    const {
      patientId,
      appointmentId,
      reasonForVisit,
      clinicalNotes,
      diagnosis,
      treatmentPlan,
      vitals,
    } = req.body;

    if (!patientId || !appointmentId) {
      return res.json({
        success: false,
        message: "Patient and appointment are required",
      });
    }

    // Verify that this appointment belongs
    // to this doctor and patient
    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      docId: doctorId.toString(),
      userId: patientId.toString(),
      cancelled: { $ne: true },
    });

    if (!appointment) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this patient",
      });
    }

    const record = new patientRecordModel({
      patientId,
      doctorId,
      appointmentId,
      reasonForVisit,
      clinicalNotes,
      diagnosis,
      treatmentPlan,
      vitals,
    });

    await record.save();

    res.json({
      success: true,
      message: "Patient record created successfully",
      record,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// PATIENT: GET OWN MEDICAL RECORDS
// ===============================

const getPatientRecords = async (req, res) => {
  try {
    const patientId = req.userId;

    const records = await patientRecordModel
      .find({ patientId })
      .populate("doctorId", "name speciality image")
      .sort({ consultationDate: -1 });

    res.json({
      success: true,
      records,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// DOCTOR: GET PATIENT HISTORY
// ===============================

const getDoctorPatientRecords = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const { patientId } = req.params;

    // Make sure doctor has actually treated this patient
    const appointment = await appointmentModel.findOne({
      docId: doctorId.toString(),
      userId: patientId.toString(),
      cancelled: { $ne: true },
    });

    if (!appointment) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this patient",
      });
    }

    const records = await patientRecordModel
      .find({
        patientId,
        doctorId,
      })
      .populate("doctorId", "name speciality image")
      .sort({ consultationDate: -1 });

    res.json({
      success: true,
      records,
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
  createPatientRecord,
  getPatientRecords,
  getDoctorPatientRecords,
};
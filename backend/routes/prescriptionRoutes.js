import express from "express";

import {
  createPrescription,
  getPatientPrescriptions,
  getDoctorPatientPrescriptions,
} from "../controllers/prescriptionController.js";

import authUser from "../middlewares/authUser.js";
import authDoctor from "../middlewares/authDoctor.js";

const prescriptionRouter = express.Router();


// ==========================================
// PATIENT
// ==========================================

prescriptionRouter.get(
  "/my-prescriptions",
  authUser,
  getPatientPrescriptions
);


// ==========================================
// DOCTOR
// ==========================================

prescriptionRouter.post(
  "/create",
  authDoctor,
  createPrescription
);

prescriptionRouter.get(
  "/patient/:patientId",
  authDoctor,
  getDoctorPatientPrescriptions
);


export default prescriptionRouter;
import express from "express";

import {
  createPatientRecord,
  getPatientRecords,
  getDoctorPatientRecords,
} from "../controllers/patientRecordController.js";

import authUser from "../middlewares/authUser.js";
import authDoctor from "../middlewares/authDoctor.js";

const patientRecordRouter = express.Router();


// Patient
patientRecordRouter.get(
  "/my-records",
  authUser,
  getPatientRecords
);


// Doctor
patientRecordRouter.post(
  "/create",
  authDoctor,
  createPatientRecord
);

patientRecordRouter.get(
  "/patient/:patientId",
  authDoctor,
  getDoctorPatientRecords
);

export default patientRecordRouter;
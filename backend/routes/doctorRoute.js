import express from "express";
import authDoctor from "../middlewares/authDoctor.js";
import upload from "../middlewares/multer.js";

import { 
changeAvailability, 
doctorList, 
getDoctorById, 
searchDoctor, 
doctorDashboard, 
doctorLogin, 
updateAppointmentStatus,
updateDoctorProfile,
updateDoctorImage,
changeDoctorPassword,
forgotDoctorPassword,
resetDoctorPassword 
} from "../controllers/doctorController.js";


const doctorRouter = express.Router();


doctorRouter.post(
"/change-availability",
changeAvailability
);


doctorRouter.get(
"/list",
doctorList
);


doctorRouter.get(
"/search",
searchDoctor
);



doctorRouter.post(
"/dashboard",
authDoctor,
doctorDashboard
);



doctorRouter.post(
"/update-appointment",
authDoctor,
updateAppointmentStatus
);



doctorRouter.post(
"/update-profile",
authDoctor,
updateDoctorProfile
);

doctorRouter.post(
"/login",
doctorLogin
);

doctorRouter.post(
    "/change-password",
    authDoctor,
    changeDoctorPassword
);

doctorRouter.post(
    "/forgot-password",
    forgotDoctorPassword
);

doctorRouter.post(
    "/reset-password/:token",
    resetDoctorPassword
);

doctorRouter.post(
"/update-image",
authDoctor,
upload.single("image"),
updateDoctorImage
);

doctorRouter.get(
"/:id",
getDoctorById
);



export default doctorRouter;
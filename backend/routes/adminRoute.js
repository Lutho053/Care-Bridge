import express from 'express'
import { addDoctor, allDoctors, loginAdmin, getAllAppointments } from '../controllers/adminController.js'
import upload from '../models/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'


const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin ,upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors' ,allDoctors)
adminRouter.post('/change-availability' ,changeAvailability)
adminRouter.get('/appointments', authAdmin, getAllAppointments);


export default adminRouter
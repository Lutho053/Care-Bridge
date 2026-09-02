import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import payfastRouter from './routes/payfastRoutes.js'
import patientRecordRouter from "./routes/patientRecordRoutes.js";
import prescriptionRouter from "./routes/prescriptionRoutes.js";


//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin',adminRouter) 
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.use("/api/payfast",payfastRouter);
app.use("/api/patient-records", patientRecordRouter);
app.use("/api/prescriptions", prescriptionRouter);


app.get('/',(req,res)=>{
    res.send('API WORKING')
})

app.listen(port,()=> console.log("Server Started",port))
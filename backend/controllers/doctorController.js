// controllers/doctorController.js

import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import nodemailer from "nodemailer";


const changeAvailability = async (req,res) => {
  try {

    const {docId} = req.body;

    const docData = await doctorModel.findById(docId);

    await doctorModel.findByIdAndUpdate(
      docId,
      {available : !docData.available}
    );

    res.json({
      success:true,
      message:"Availability changed"
    });

  } catch (error) {

    res.json({
      success:false,
      message:error.message
    });

  }
};



const doctorList = async (req,res)=> {

  try {

    const doctors = await doctorModel
    .find({})
    .select(['-password','-email']);

    res.json({
      success:true,
      doctors
    });

  } catch(error){

    res.json({
      success:false,
      message:error.message
    });

  }

};



// SEARCH DOCTOR BY SPECIALITY
const searchDoctor = async(req,res)=>{

    try{

        const { speciality } = req.query;


        const doctors = await doctorModel.find({

            $or:[

                {
                    name:{
                        $regex:speciality,
                        $options:"i"
                    }
                },

                {
                    speciality:{
                        $regex:speciality,
                        $options:"i"
                    }
                }

            ]

        }).select("-password -email");


        res.json({

            success:true,
            doctors

        });


    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};




// Derived doctor by id with computed slots
const getDoctorById = async (req, res) => {

  try {

    const doc = await doctorModel
    .findById(req.params.id)
    .select("-password");


    if (!doc) {
      return res.status(404).json({
        success:false,
        message:"Doctor not found"
      });
    }


    const now = Date.now();


    const activeAppointments = await appointmentModel.find({

      docId:req.params.id,

      cancelled:{
        $ne:true
      },

      $or:[
        {
          payment:true
        },
        {
          payment:{
            $ne:true
          },
          paymentExpiresAt:{
            $gt:now
          }
        }
      ]

    },"slotDate slotTime");



    const slots = {};


    for(const a of activeAppointments){

      if(!slots[a.slotDate]){
        slots[a.slotDate]=[];
      }


      if(!slots[a.slotDate].includes(a.slotTime)){
        slots[a.slotDate].push(a.slotTime);
      }

    }



    const out = doc.toObject();

    out.slots_booked = slots;



    res.json({
      success:true,
      doctor:out
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};

const doctorDashboard = async(req,res)=>{

  try{

    const docId=req.doctorId;


    const doctor = await doctorModel
    .findById(docId)
    .select("-password");


    if(!doctor){

      return res.json({
        success:false,
        message:"Doctor not found"
      });

    }


    const appointments = await appointmentModel.find({
      docId
    });


    res.json({

      success:true,

      doctor,

      appointments

    });


  }catch(error){

    res.json({

      success:false,
      message:error.message

    });

  }

}
const doctorLogin = async(req,res)=>{

  try{

    const {email,password}=req.body;

     console.log("Email entered:", email);
     console.log("Password entered:", password);


    const doctor = await doctorModel.findOne({email});


    if(!doctor){

      return res.json({
        success:false,
        message:"Doctor not found"
      });

    }

    console.log("Doctor found:", doctor.email);
    console.log("Stored password:", doctor.password);



    const isMatch = await bcrypt.compare(
      password,
      doctor.password
    );

    console.log("Password match:", isMatch);

    if(!isMatch){

      return res.json({
        success:false,
        message:"Invalid password"
      });

    }



    const token = jwt.sign(
      {
        id:doctor._id
      },
      process.env.JWT_SECRET
    );



    res.json({

      success:true,

      token,

      doctor:{
        id:doctor._id,
        name:doctor.name,
        email:doctor.email,
        speciality:doctor.speciality
      }

    });



  }catch(error){

    res.json({
      success:false,
      message:error.message
    });

  }

};

const updateAppointmentStatus = async(req,res)=>{

try{


const {appointmentId,status}=req.body;


const appointment = await appointmentModel.findById(
appointmentId
);


if(!appointment){

return res.json({
success:false,
message:"Appointment not found"
});

}



if(status==="cancelled"){

appointment.cancelled = true;

}



if(status==="completed"){

appointment.isCompleted = true;

}



await appointment.save();



res.json({

success:true,

message:"Appointment updated"

});


}catch(error){


res.json({

success:false,
message:error.message

});


}

};

const updateDoctorProfile = async(req,res)=>{

try{

const docId = req.doctorId;

const {
about,
fees,
available
} = req.body;


await doctorModel.findByIdAndUpdate(
docId,
{
about,
fees,
available
}
);


res.json({

success:true,
message:"Profile Updated"

});


}catch(error){

res.json({

success:false,
message:error.message

});

}

};


const updateDoctorImage = async(req,res)=>{

try{

const docId = req.doctorId;

const imageFile = req.file;


if(!imageFile){

return res.json({

success:false,
message:"No image selected"

});

}


const uploadResult =
await cloudinary.uploader.upload(
imageFile.path,
{
resource_type:"image"
}
);


await doctorModel.findByIdAndUpdate(

docId,

{
image:uploadResult.secure_url
}

);


res.json({

success:true,
image:uploadResult.secure_url

});


}catch(error){

res.json({

success:false,
message:error.message

});

}

};

const changeDoctorPassword = async (req, res) => {
    try {

        const { currentPassword, newPassword, confirmPassword } = req.body;

        const doctorId = req.doctorId;

        // Check that all fields are provided
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.json({
                success: false,
                message: "All password fields are required"
            });
        }

        // Check new password confirmation
        if (newPassword !== confirmPassword) {
            return res.json({
                success: false,
                message: "New passwords do not match"
            });
        }

        // Check password length
        if (newPassword.length < 8) {
            return res.json({
                success: false,
                message: "New password must be at least 8 characters"
            });
        }

        // Find doctor
        const doctor = await doctorModel.findById(doctorId);

        if (!doctor) {
            return res.json({
                success: false,
                message: "Doctor not found"
            });
        }

        // Check current password
        const isMatch = await bcrypt.compare(
            currentPassword,
            doctor.password
        );

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            newPassword,
            salt
        );

        // Save new password
        doctor.password = hashedPassword;

        await doctor.save();

        return res.json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });

    }
};

const forgotDoctorPassword = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {

            return res.json({
                success: false,
                message: "Please enter your email address"
            });

        }


        const doctor = await doctorModel.findOne({
            email: email.toLowerCase()
        });


        // Don't reveal whether an email exists
        if (!doctor) {

            return res.json({
                success: true,
                message: "If an account exists with this email, a password reset link has been sent."
            });

        }


        // Generate random reset token
        const resetToken = crypto.randomBytes(32).toString("hex");


        // Store hashed token in database
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");


        doctor.resetPasswordToken = hashedToken;

        // Token expires in 15 minutes
        doctor.resetPasswordExpires =
            Date.now() + 15 * 60 * 1000;


        await doctor.save();


        // Frontend reset page
        const resetUrl =
            `http://localhost:5174/doctor/reset-password/${resetToken}`;


        const transporter = nodemailer.createTransport({

            host: process.env.MAIL_HOST,

            port: Number(process.env.MAIL_PORT),

            secure: true,

            auth: {
                user: process.env.MAIL_USER,

                pass: process.env.MAIL_PASSWORD
            }

        });


        await transporter.sendMail({

            from: `"CareBridge" <${process.env.MAIL_USER}>`,

            to: doctor.email,

            subject: "CareBridge Password Reset",

            html: `

                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">

                    <h2 style="color: #2563eb;">
                        CareBridge Password Reset
                    </h2>

                    <p>
                        Hello , ${doctor.name},
                    </p>

                    <p>
                        We received a request to reset the password
                        for your CareBridge doctor account.
                    </p>

                    <p>
                        Click the button below to create a new password.
                    </p>

                    <a
                        href="${resetUrl}"
                        style="
                            display: inline-block;
                            background: #2563eb;
                            color: white;
                            padding: 12px 20px;
                            text-decoration: none;
                            border-radius: 8px;
                            margin: 15px 0;
                        "
                    >
                        Reset Password
                    </a>

                    <p>
                        This link will expire in 15 minutes.
                    </p>

                    <p>
                        If you did not request this password reset,
                        you can safely ignore this email.
                    </p>

                    <hr />

                    <p style="color: #777; font-size: 12px;">
                        CareBridge — Connecting patients with healthcare professionals.
                    </p>

                </div>

            `

        });


        return res.json({

            success: true,

            message:
                "If an account exists with this email, a password reset link has been sent."

        });


    } catch (error) {

        console.log(error);

        return res.json({

            success: false,

            message: "Unable to process password reset request"

        });

    }

};

const resetDoctorPassword = async (req, res) => {

    try {

        const { token } = req.params;

        const {
            newPassword,
            confirmPassword
        } = req.body;


        if (!newPassword || !confirmPassword) {

            return res.json({
                success: false,
                message: "Please fill in all fields"
            });

        }


        if (newPassword.length < 8) {

            return res.json({

                success: false,

                message:
                    "Password must be at least 8 characters"

            });

        }


        if (newPassword !== confirmPassword) {

            return res.json({

                success: false,

                message:
                    "Passwords do not match"

            });

        }


        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");


        const doctor = await doctorModel.findOne({

            resetPasswordToken: hashedToken,

            resetPasswordExpires: {
                $gt: Date.now()
            }

        });


        if (!doctor) {

            return res.json({

                success: false,

                message:
                    "Password reset link is invalid or has expired"

            });

        }


        const salt = await bcrypt.genSalt(10);

        const hashedPassword =
            await bcrypt.hash(newPassword, salt);


        doctor.password = hashedPassword;

        doctor.resetPasswordToken = null;

        doctor.resetPasswordExpires = null;


        await doctor.save();


        return res.json({

            success: true,

            message:
                "Password reset successfully"

        });


    } catch (error) {

        console.log(error);

        return res.json({

            success: false,

            message:
                "Unable to reset password"

        });

    }

};


export {
  changeAvailability,
  changeDoctorPassword,
  updateDoctorProfile,
  doctorLogin,
  forgotDoctorPassword,
  resetDoctorPassword,
  doctorDashboard,
  doctorList,
  searchDoctor,
  getDoctorById,
  updateAppointmentStatus,
  updateDoctorImage
};
  
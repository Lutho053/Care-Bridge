// controllers/userController.js
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import slotReservationModel from "../models/slotReservationModel.js";




// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) return res.json({ success: false, message: "Missing Details" });
    if (!validator.isEmail(email)) return res.json({ success: false, message: "Enter a valid email" });
    if (password.length < 8) return res.json({ success: false, message: "Enter a stronger password" });

    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.json({ success: false, message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const savedUser = await new userModel({ name, email, password: hashedPassword }).save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "No account found with this email",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl =
      `http://localhost:5173/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: Number(process.env.MAIL_PORT) === 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"CareBridge" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: "CareBridge Password Reset",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          
          <h2 style="color: #2563eb;">
            CareBridge Password Reset
          </h2>

          <p>Hello ${user.name},</p>

          <p>
            We received a request to reset your CareBridge account password.
          </p>

          <p>
            Click the button below to create a new password.
          </p>

          <a
            href="${resetUrl}"
            style="
              display:inline-block;
              padding:12px 24px;
              background:#2563eb;
              color:white;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Reset Password
          </a>

          <p style="margin-top:20px;">
            This link will expire in 15 minutes.
          </p>

          <p>
            If you did not request a password reset, you can safely ignore
            this email.
          </p>

          <p>
            Regards,<br/>
            CareBridge Team
          </p>

        </div>
      `,
    });

    res.json({
      success: true,
      message: "Password reset link sent to your email",
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.json({
        success: false,
        message: "Password is required",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid or expired reset link",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10)
    );

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }
};

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.userId;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender)
      return res.json({ success: false, message: "Missing Details" });

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path);
      await userModel.findByIdAndUpdate(userId, { image: imageUpload.secure_url });
    }

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/**
 * BOOK APPOINTMENT (RESERVE ONLY)
 * - No direct write to doctor.slots_booked anymore
 * - Prevents double booking by checking active appointments:
 *   - paid = true OR (pending and not expired)
 */
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime, paymentMethod } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData || !docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    // Check for conflicting active appointments
    const now = Date.now();
    try {

    await slotReservationModel.create({

        docId,

        slotDate,

        slotTime,

        expiresAt: new Date(Date.now() + 15 * 60 * 1000)

    });

}
catch(error){

    if(error.code === 11000){

        return res.json({

            success:false,

            message:"Sorry, this appointment has just been booked by another patient."

        });

    }

    throw error;

}

    

    const userData = await userModel.findById(userId).select("-password");

    const newAppointment = new appointmentModel({
      userId,
      docId,
      userData,
      docData,              // snapshot
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
      cancelled: false,
      isCompleted: false,
      paymentExpiresAt: Date.now() + 15 * 60 * 1000, // 15 min hold
      paymentMethod,

      payment:
      paymentMethod==="online"
      ?
      "paid"
      :
      "pending",
    });

    try {

    await newAppointment.save();

    await slotReservationModel.findOneAndUpdate(

{
    docId,
    slotDate,
    slotTime
},

{
    appointmentId:newAppointment._id
}

);

}
catch(error){

    await slotReservationModel.deleteOne({

        docId,

        slotDate,

        slotTime

    });

    throw error;

}

    // return appointmentId for PayFast
    res.json({ success: true, message: "Appointment reserved. Proceed to payment.", appointmentId: newAppointment._id });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// LIST APPOINTMENTS
const listAppointment = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({ userId: req.userId })
      .sort({ date: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// CANCEL APPOINTMENT (releases slot by making it inactive; no doctor.slots mutation needed)
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to cancel",
      });
    }

    // Cancel the appointment
    appointment.cancelled = true;
    await appointment.save();

    // Release the reserved slot
    await slotReservationModel.deleteOne({
      docId: appointment.docId,
      slotDate: appointment.slotDate,
      slotTime: appointment.slotTime,
    });

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// For the frontend to fetch a *fresh* doctor with derived slots
const getDoctorById = async (req, res) => {
  try {
    const doc = await doctorModel.findById(req.params.id).select("-password");
    if (!doc) return res.status(404).json({ success: false, message: "Doctor not found" });

    const now = Date.now();

    // Build up-to-date slots from active appointments (paid OR pending and not expired)
    const activeAppointments = await appointmentModel.find({
      docId: req.params.id,
      cancelled: { $ne: true },
      $or: [
        { payment: true },
        { payment: { $ne: true }, paymentExpiresAt: { $gt: now } }
      ]
    }, "slotDate slotTime");

    const slots = {};
    for (const a of activeAppointments) {
      if (!slots[a.slotDate]) slots[a.slotDate] = [];
      if (!slots[a.slotDate].includes(a.slotTime)) {
        slots[a.slotDate].push(a.slotTime);
      }
    }

    const out = doc.toObject();
    out.slots_booked = slots; // derived, not persisted
    res.json({ success: true, doctor: out });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  getDoctorById,
};

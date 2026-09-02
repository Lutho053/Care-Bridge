import mongoose from "mongoose";

const patientRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointment",
    },

    consultationDate: {
      type: Date,
      default: Date.now,
    },

    reasonForVisit: {
      type: String,
      default: "",
    },

    clinicalNotes: {
      type: String,
      default: "",
    },

    diagnosis: {
      type: String,
      default: "",
    },

    treatmentPlan: {
      type: String,
      default: "",
    },

    vitals: {
      bloodPressure: {
        type: String,
        default: "",
      },

      temperature: {
        type: String,
        default: "",
      },

      pulse: {
        type: String,
        default: "",
      },

      weight: {
        type: String,
        default: "",
      },

      height: {
        type: String,
        default: "",
      },
    },

    attachments: [
      {
        name: String,
        url: String,
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const patientRecordModel =
  mongoose.models.patientRecord ||
  mongoose.model("patientRecord", patientRecordSchema);

export default patientRecordModel;
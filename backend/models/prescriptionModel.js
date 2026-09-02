import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
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

    medications: [
      {
        name: {
          type: String,
          required: true,
        },

        dosage: {
          type: String,
          required: true,
        },

        frequency: {
          type: String,
          required: true,
        },

        duration: {
          type: String,
          required: true,
        },

        instructions: {
          type: String,
          default: "",
        },
      },
    ],

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const prescriptionModel =
  mongoose.models.prescription ||
  mongoose.model("prescription", prescriptionSchema);

export default prescriptionModel;
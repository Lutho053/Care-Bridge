import mongoose from "mongoose";

const slotReservationSchema = new mongoose.Schema(
{
    docId:{
        type:String,
        required:true
    },

    slotDate:{
        type:String,
        required:true
    },

    slotTime:{
        type:String,
        required:true
    },

    appointmentId:{
        type:String,
        default:""
    },

    expiresAt:{
        type:Date,
        required:true
    }

},
{
    timestamps:true
}
);

slotReservationSchema.index(
{
    docId:1,
    slotDate:1,
    slotTime:1
},
{
    unique:true
}
);

slotReservationSchema.index(
{
    expiresAt:1
},
{
    expireAfterSeconds:0
}
);

const slotReservationModel =
mongoose.models.slotReservation ||
mongoose.model(
"slotReservation",
slotReservationSchema
);

export default slotReservationModel;
import express from "express";
import { createPayment } from "../controllers/payfastController.js";

const payfastRouter = express.Router();


payfastRouter.post(
    "/pay",
    createPayment
);


export default payfastRouter;
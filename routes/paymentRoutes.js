import express from "express";
import {
  getPayments,
  createPayment,
  getFarmerPayments,
} from "../controllers/paymentControllers.js";
import { auth } from "../middlewares/auth.js";
import { adminAuth } from "../middlewares/adminAuth.js";
const router = express.Router();

router
  .route("/payment")
  .get(auth, adminAuth, getPayments)
  .post(auth, createPayment);

router.get("/payment/farmer", auth, adminAuth, getFarmerPayments);

export default router;

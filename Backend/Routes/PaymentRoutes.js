import express from "express";
import {
  createPayment, 
  getAllPayments, 
  getPaymentById, 
  updatePayment, 
  deletePayment, 
} from "../Controller/PaymentController.js";

const router = express.Router();

// Route to create a PaymentIntent (Stripe)
router.post("/create_payment", createPayment);
router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

export default router;

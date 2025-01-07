import express from 'express';
import { createPaymentIntent } from "../Controller/PaymentController.js";

const router = express.Router();

// Route to create a PaymentIntent
router.post("/create_payment", createPaymentIntent);

export default router; 

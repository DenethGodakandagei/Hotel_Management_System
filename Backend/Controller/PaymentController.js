import Payment from "../Model/Payment.js";
import stripe from "../config/StripeConfig.js";

// Create a Payment and PaymentIntent
export const createPayment = async (req, res) => {
  const { email, roomId, amount, currency } = req.body;

  try {
    // Create a PaymentIntent using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency, // e.g., 'usd'
    });

    // Save the payment details in the database
    const newPayment = new Payment({
      email,
      roomId,
      paymentIntentId: paymentIntent.id,
      amount,
    });

    await newPayment.save();

    res.status(201).send({
      message: "Payment created successfully",
      payment: newPayment,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment:", error.message);
    res.status(500).send({ error: error.message });
  }
};

// Get all Payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("roomId"); // Populating room details
    res.status(200).send(payments);
  } catch (error) {
    console.error("Error fetching payments:", error.message);
    res.status(500).send({ error: error.message });
  }
};

// Get a Payment by ID
export const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id).populate("roomId");

    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }

    res.status(200).send(payment);
  } catch (error) {
    console.error("Error fetching payment:", error.message);
    res.status(500).send({ error: error.message });
  }
};

// Update a Payment
export const updatePayment = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPayment) {
      return res.status(404).send({ message: "Payment not found" });
    }

    res.status(200).send({
      message: "Payment updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("Error updating payment:", error.message);
    res.status(500).send({ error: error.message });
  }
};

// Delete a Payment
export const deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).send({ message: "Payment not found" });
    }

    res.status(200).send({
      message: "Payment deleted successfully",
      payment: deletedPayment,
    });
  } catch (error) {
    console.error("Error deleting payment:", error.message);
    res.status(500).send({ error: error.message });
  }
};

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// Load Stripe with publishable key from environment variables
const stripePromise = loadStripe("pk_test_51QeUmGQP2cLYp48gx46lx8zTLraBQX3wK95fVk3GUUmRESmaki00yUXf9dXVmoRemMVyuifjMzFRtYMo5HAcbCgs00KqTunN9s");

const CheckoutForm = ({ reservationData, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const cardElement = elements.getElement(CardElement);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please wait.");
      setLoading(false);
      return;
    }

    if (!reservationData || !reservationData.amount || reservationData.amount <= 0) {
      setError("Invalid amount. Please try again.");
      setLoading(false);
      return;
    }

    // Log reservationData before sending to the backend
    console.log("Reservation Data:", reservationData);

    try {
      // Create PaymentIntent on the server
      const res = await axios.post(
        "http://localhost:5000/api/payments/create_payment",
        { amount: reservationData.amount, currency: "usd" },
        { headers: { "Content-Type": "application/json" } }
      );

      const { clientSecret } = res.data;

      // Log clientSecret received from the backend
      console.log("Client Secret:", clientSecret);

      // Confirm the payment with Stripe
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      // Log paymentResult to check the response from Stripe
      console.log("Payment Result:", paymentResult);

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        setSuccess("Payment successful!");
        await onPaymentSuccess(paymentResult.paymentIntent);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error:", err); // Log the error
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-lg bg-white shadow-xl max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Complete Your Payment</h2>
      
      {/* Reservation Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Reservation Summary</h3>
        <p className="text-gray-700">Room Type: {reservationData.roomType}</p>
        <p className="text-gray-700">Check-in Date: {new Date(reservationData.checkInDate).toLocaleDateString()}</p>
        <p className="text-gray-700">Check-out Date: {new Date(reservationData.checkOutDate).toLocaleDateString()}</p>
        <p className="text-gray-700">Total Amount: ${reservationData.amount}</p>
      </div>
      
      {/* Card Element */}
      <CardElement
        className="p-4 border border-gray-300 rounded-md mb-4"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
      
      <div className="flex justify-between items-center mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
};

const Payment = ({ reservationData, onPaymentSuccess }) => {
  // Handle post-payment actions, such as sending the reservation data to the backend
  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Send reservation data to the backend after payment success
      const response = await axios.post("http://localhost:5000/api/reservations", {
        email: reservationData.email,
        roomId: reservationData.roomId,
        checkInDate: reservationData.checkInDate,
        checkOutDate: reservationData.checkOutDate,
      });

      if (response.status === 201) {
        alert("Reservation created successfully!");

        // Optionally, update events or trigger other actions after reservation is created
        // setEvents((prevEvents) => [...prevEvents, newEvent]); // Example: Update events
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Error creating reservation.");
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm reservationData={reservationData} onPaymentSuccess={handlePaymentSuccess} />
    </Elements>
  );
};

export default Payment;

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";

// Load Stripe with the publishable key from environment variables
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
      // Create a payment on the backend
      const res = await axios.post(
        "http://localhost:5000/api/payments/create_payment", // Your backend payment route
        {
          email: reservationData.email,
          roomId: reservationData.roomId,
          amount: reservationData.amount,
          currency: "usd", // Assuming the currency is USD
        },
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
    <form onSubmit={handleSubmit} className="p-8 border rounded-lg bg-white shadow-xl max-w-md mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-center text-orange-500 mb-8">Complete Your Payment</h2>

      {/* Reservation Summary */}
      <div className="bg-white shadow-lg p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Reservation Summary</h3>
        <div className="space-y-4">
          {/* Check-in Date */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Check-in Date:</p>
            <p className="font-medium text-gray-800">{new Date(reservationData.checkInDate).toLocaleDateString()}</p>
          </div>

          {/* Check-out Date */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Check-out Date:</p>
            <p className="font-medium text-gray-800">{new Date(reservationData.checkOutDate).toLocaleDateString()}</p>
          </div>

          {/* Total Amount */}
          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <p className="text-gray-600">Total Amount:</p>
            <p className="font-semibold text-xl text-gray-900">${reservationData.amount}</p>
          </div>
        </div>
      </div>

      {/* Card Element */}
      <div className="mb-6">
        <CardElement
          className="p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      {/* Error and Success Messages */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {success && <p className="text-green-500 mt-4 text-center">{success}</p>}

      {/* Payment Button */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-orange-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:outline-none disabled:bg-gray-300"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
};

const Payment = ({ reservationData, onPaymentSuccess }) => {
  console.log(reservationData);
  const navigate = useNavigate();
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
        toast.success("Reservation created successfully!");
      }
      navigate("/dashboard");
    
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast.error("Error creating reservation.");
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm reservationData={reservationData} onPaymentSuccess={handlePaymentSuccess} />
    </Elements>
  );
};

export default Payment;

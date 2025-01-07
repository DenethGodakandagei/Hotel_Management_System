import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

//  Stripe publishable key
const stripePromise = loadStripe("pk_test_51QeUmGQP2cLYp48gx46lx8zTLraBQX3wK95fVk3GUUmRESmaki00yUXf9dXVmoRemMVyuifjMzFRtYMo5HAcbCgs00KqTunN9s"); 

const CheckoutForm = () => {
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

    // Get card details
    const cardElement = elements.getElement(CardElement);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please wait.");
      setLoading(false);
      return;
    }

    try {
      // Call your backend to create a PaymentIntent
      const res = await fetch("http://localhost:5000/api/payments/create_payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 5000, currency: "usd" }), // Adjust amount and currency as needed
      });

      const { clientSecret } = await res.json();

      // Confirm card payment
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        setSuccess("Payment successful!");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6  border rounded-lg bg-white shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Make a Payment</h2>
      <CardElement
        className="p-3 border border-gray-300 rounded-md"
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
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay $50"}
      </button>
    </form>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;

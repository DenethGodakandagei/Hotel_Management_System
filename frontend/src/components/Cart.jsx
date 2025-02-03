import React, { useState } from "react";
import { useCart } from "../context/cartContext.js";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address:  user?.address||"",
  });
  console.log(user);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleChange = (e) => {
    setCheckoutDetails({ ...checkoutDetails, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!checkoutDetails.name || !checkoutDetails.email || !checkoutDetails.phone || !checkoutDetails.address) {
      setError("All fields are required.");
      return;
    }

    // Prepare order data based on cart items
    const orderData = {
      userId: user.id,
      items: cartItems.map(item => ({
        menuItemId: item._id,
        quantity: item.quantity
      })),
      shippingAddress: checkoutDetails.address,
    };

    setError("");
    setIsLoading(true);

    try {
      // Send request to the backend to create the order
      const response = await axios.post("http://localhost:5000/api/orders/create", orderData);
      setSuccessMessage("Order placed successfully!");
      setShowCheckout(false)
    } catch (err) {
      console.error(err);
      setError("There was an error placing your order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-2xl mx-auto">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-4">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-gray-200 px-3 py-1 rounded-md"
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-gray-200 px-3 py-1 rounded-md"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-lg mt-4">Total: ${calculateTotal()}</div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-md"
              onClick={() => setShowCheckout(true)}
              disabled={!user}
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      <div className="text-center mt-6">
        <Link to="/dining" className="text-orange-500">← Back to Menu</Link>
      </div>

      {showCheckout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}
            <input
              type="text"
              name="name"
              value={checkoutDetails.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 mb-2 rounded-md"
            />
            <input
              type="email"
              name="email"
              value={checkoutDetails.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-2 mb-2 rounded-md"
            />
            <input
              type="tel"
              name="phone"
              value={checkoutDetails.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border p-2 mb-2 rounded-md"
            />
            <input
              type="text"
              name="address"
              value={checkoutDetails.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border p-2 mb-2 rounded-md"
            />
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowCheckout(false)}
              >
                Cancel
              </button>
              <div className="text-right font-bold text-lg mt-4">Total: ${calculateTotal()}</div>
              <button
                className="bg-primary1 text-white px-4 py-2 rounded-md"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? 'Placing Order...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

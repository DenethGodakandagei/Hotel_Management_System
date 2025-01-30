import React from "react";
import { useCart } from "../context/cartContext.js";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-2xl mx-auto">
          {cartItems.map((item) => (
            <div key={item.name} className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-4">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-gray-200 px-3 py-1 rounded-md"
                  onClick={() => updateQuantity(item.name, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-gray-200 px-3 py-1 rounded-md"
                  onClick={() => updateQuantity(item.name, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                  onClick={() => removeFromCart(item.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-lg mt-4">Total: ${calculateTotal()}</div>
          <div className="flex justify-center mt-6">
            <button className="bg-green-500 text-white px-6 py-2 rounded-md">Checkout</button>
          </div>
        </div>
      )}

      <div className="text-center mt-6">
        <Link to="/dining" className="text-orange-500">← Back to Menu</Link>
      </div>
    </div>
  );
};

export default Cart;

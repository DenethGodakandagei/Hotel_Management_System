import React, { createContext, useContext, useState } from "react";

// Create the Cart Context
const CartContext = createContext();

// Custom Hook for Using Cart
export const useCart = () => {
  return useContext(CartContext);
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (name) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.name !== name));
  };

  // Update item quantity
  const updateQuantity = (name, quantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) => (item.name === name ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

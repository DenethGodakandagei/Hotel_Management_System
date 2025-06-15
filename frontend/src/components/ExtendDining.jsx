import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.svg";
import { IoMdHome } from "react-icons/io";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext'; 
import toast from 'react-hot-toast';
import api from "../services/api";

export const ExtendDining = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useCart(); 

  // Fetch menu items from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        //const response = await axios.get('http://localhost:5000/api/menu');
       const response = await api.get('/menu');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    fetchMenuItems();
  }, []);

  // Function to handle adding items to cart
  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(` ${item.name} has been added to your cart!`);
  };

  return (
    <div id="dining"> 
      {/* Header Section */}
      <div className="flex items-center justify-between w-full p-3">
        <div className="flex">
          <img src={logo} alt="Logo" style={{ width: "70px" }} />
          <span className="pt-5 text-xl font-semibold text-primary1">LuxeStay</span>
        </div>
        <div className='flex'>
        <ul>
        <li>
               <Link
                    to="/cart"
                className="text-primary1 mt-5 m-3 text-lg hover:text-primary2 block md:inline-block"
              >
                Cart
                </Link>
            </li>
        </ul>
        <Link to="/">
          <div className="p-2 m-3 border border-solid rounded-md border-primary1">
            <IoMdHome style={{ fontSize: "30px", color: "orange" }} />
          </div>
        </Link>
      </div>
      </div>

      {/* Menu Section */}
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 pt-14 mb-6">Our Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.name} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <p className="text-orange-600 font-semibold mt-4">${item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleAddToCart(item)} // Update to use handleAddToCart
                className="mt-4 w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-500"
              >
                Add to Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

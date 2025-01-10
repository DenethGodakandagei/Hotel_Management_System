import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';

const Dining = () => {
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu items from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Our Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={item.imageUrl }
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <p className="text-orange-600 font-semibold mt-4">${item.price.toFixed(2)}</p>
              </div>
              <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-500">
                Add to Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dining;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext.js";
import logo from "../../assets/logo.svg";
import { IoMdHome } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";

const DashboardNavigater = () => {
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex">
      {/* Hamburger Menu Button for Mobile */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md"
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`h-screen bg-white shadow-lg fixed z-40 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 lg:w-64 w-64`}
      >
        <div className="flex items-center justify-between p-4">
          <img src={logo} alt="Logo" style={{ width: "40px" }} />
          <Link to={"/"}>
            <IoMdHome style={{ fontSize: "20px", color: "orange" }} />
          </Link>
        </div>
        <h1 className="text-2xl p-4 font-bold text-primary1">Admin Dashboard</h1>
        <ul className="space-y-6 p-4">
          {[
            { name: "Dashboard Overview", path: "/Admin/dashboard" },
            { name: "Manage Users", path: "/manageusers" },
            { name: "Rooms", path: "/managerooms" },
            { name: "Reservations", path: "/reservations" },
            { name: "Manage Menu", path: "/managemenu" },
            { name: "Settings", path: "/settings" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="p-3 block text-gray-700 hover:text-white hover:bg-primary1 rounded-md cursor-pointer transition duration-300"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="p-3 block text-gray-700 hover:text-white hover:bg-primary1 rounded-md cursor-pointer transition duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:pl-72">
        {/* Add your dashboard content here */}
      </main>
    </div>
  );
};

export default DashboardNavigater;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext.js";
import logo from "../../assets/logo.svg";
import { IoMdHome } from "react-icons/io";

const DashboardNavigater = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="flex">
      
      {/* Sidebar */}
      <aside className=" h-screen bg-white shadow-lg  fixed">
      <div className=" flex items-center justify-between w-full">
          <div className='m-3'>
            <img src={logo} alt="Logo" style={{ width: "40px" }} />
          </div>
          <Link to={"/"}>
            <div className="  rounded-md ">
              <IoMdHome style={{ fontSize: "20px", color: "orange" }} />
            </div>
          </Link>
        </div>
        <h1 className="text-2xl p-6 font-bold text-orange-600 mb-10">
          Admin Dashboard
        </h1>
        <ul className="space-y-6 p-6">
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
                to={item.path} // Use Link for navigation
                className="p-3 text-gray-700 hover:text-white hover:bg-orange-500 rounded-md cursor-pointer transition duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="pl-2 text-gray-700 hover:text-white hover:bg-orange-500 rounded-md cursor-pointer transition duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>
      
      <main className="  p-28">
       
      </main>
    </div>
  );
};

export default DashboardNavigater;

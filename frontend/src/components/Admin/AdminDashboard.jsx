import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";

const AdminDashboard = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); 
    window.location.href = '/';
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-lg p-6 fixed h-full top-0 left-0 z-10">
        <h1 className="text-2xl font-bold text-orange-600 mb-10">
          Admin Dashboard
        </h1>
        <ul className="space-y-6">
          {[
            { name: "Dashboard Overview", path: "/" },
            { name: "Manage Users", path: "/manageusers" },
            { name: "Rooms", path: "/managerooms" },
            { name: "Reservations", path: "/reservations" },
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

      {/* Main Content */}
      <main className="flex-1 ml-1/5 p-8 overflow-y-auto">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold">Welcome, Admin!</h2>
          <p className="mt-2 text-sm">Here's a summary of your dashboard.</p>
        </div>

        {/* Dashboard Widgets */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Rooms Widget */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-700 text-lg font-semibold">Total Rooms</h3>
            <p className="text-4xl font-bold text-orange-600 mt-4">567</p>
          </div>

          {/* Reservations Widget */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-700 text-lg font-semibold">Reservations</h3>
            <p className="text-4xl font-bold text-orange-600 mt-4">124</p>
          </div>

          {/* Monthly Revenue Widget */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-700 text-lg font-semibold">Monthly Revenue</h3>
            <p className="text-4xl font-bold text-orange-600 mt-4">$12,345</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

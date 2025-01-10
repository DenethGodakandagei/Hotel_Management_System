import React from "react";
import { Link } from "react-router-dom";
import ViewRooms from "./ViewRooms";
import AddRooms from "./AddRooms";

const ManageRooms = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-lg p-6">
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
            { name: "Logout", path: "/logout" },
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
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold">Manage Rooms</h2>
         
        </div>

        {/* Dashboard Content */}
        <div className="mt-10">
          {/* Dashboard Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
            <div className="bg-white rounded-lg shadow-md">
              <ViewRooms />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <AddRooms />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageRooms;

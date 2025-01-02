import React from "react";
import ManageRooms from "./ManageRooms";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white rounded-lg m-3 p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <ul className="space-y-4">
          <li className="hover:bg-orange-100 p-3 rounded cursor-pointer">Dashboard Overview</li>
          <li className="hover:bg-orange-100 p-3 rounded cursor-pointer">Manage Users</li>
          <li className="hover:bg-orange-100 p-3 rounded cursor-pointer">Rooms</li>
          <li className="hover:bg-orange-100 p-3 rounded cursor-pointer">Resevations</li>
          <li className="hover:bg-orange-100 p-3 rounded cursor-pointer">Settings</li>
          <li className="hover:bg-orange-100 p-3 rounded cursor-pointer">Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Admin!</h2>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-orange-300 p-3 rounded shadow-md">
          <ManageRooms />
          </div>
          <div className="bg-green-200 p-6 rounded shadow-md">
            <h3 className="text-xl font-bold">Total </h3>
            <p className="text-3xl mt-2">567</p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

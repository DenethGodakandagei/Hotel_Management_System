import React, { useState } from "react";
import ManageRooms from "./ManageRooms";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-lg p-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-10">
          Admin Dashboard
        </h1>
        <ul className="space-y-6">
          {[
            "Dashboard Overview",
            "Manage Users",
            "Rooms",
            "Reservations",
            "Settings",
            "Logout",
          ].map((item, index) => (
            <li
              key={index}
              className="p-3 text-gray-700 hover:text-white hover:bg-orange-500 rounded-md cursor-pointer transition duration-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold">Welcome, Admin!</h2>
          <p className="mt-2 text-sm">Here's a summary of your dashboard.</p>
        </div>

        {/* Dashboard Content */}
        <div className="mt-10">
          {/* Dashboard Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-700 text-lg font-semibold">
                Total Rooms
              </h3>
              <p className="text-4xl font-bold text-orange-600 mt-4">567</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-700 text-lg font-semibold">
                Reservations
              </h3>
              <p className="text-4xl font-bold text-orange-600 mt-4">124</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-700 text-lg font-semibold">
                Monthly Revenue
              </h3>
              <p className="text-4xl font-bold text-orange-600 mt-4">$12,345</p>
            </div>
          </div>

          {/* Add New Room Button */}
          <div className="mt-8">
            <button
              onClick={openModal}
              className="px-6 py-3 bg-orange-500 text-white text-sm font-medium rounded-md shadow hover:bg-orange-600 transition duration-300"
            >
              Add New Room
            </button>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
 <div className="bg-white rounded-lg w-3/4 max-w-2xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
   {/* Close Button in a flex container */}
   <div className="flex justify-end">
     <button
       onClick={closeModal}
       className="text-gray-500 m-2 hover:text-gray-800 text-sm font-semibold px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-300"
     >
       Close
     </button>
   </div>

   {/* Modal Content */}
   <ManageRooms />
 </div>
</div>
)}
    </div>
  );
};

export default AdminDashboard;

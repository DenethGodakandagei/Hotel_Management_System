import React, { useState } from "react";
import { Link } from "react-router-dom";
import ViewRooms from "./ViewRooms";
import AddRooms from "./AddRooms";
import DashboardNavigater from "../DashboardNavigater";

const ManageRooms = () => {
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);

  // Function to open the Add Room modal
  const openAddRoomModal = () => {
    setIsAddRoomModalOpen(true);
  };

  // Function to close the Add Room modal
  const closeAddRoomModal = () => {
    setIsAddRoomModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardNavigater />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Welcome Banner */}
        <div className="flex justify-between bg-gradient-to-r from-primary2 to-primary1 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold">Manage Rooms</h2>
          <button
            onClick={openAddRoomModal}
            className="text-2xl border border-white rounded-md p-2 font-bold hover:scale-105 transition-transform"
          >
            Add Room
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="mt-10">
          {/* Dashboard Widgets */}
          <div className="bg-white rounded-lg shadow-md">
            <ViewRooms />
          </div>

          {/* Add Room Modal */}
          {isAddRoomModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[80vh] overflow-y-auto">
             
                <AddRooms />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={closeAddRoomModal}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageRooms;

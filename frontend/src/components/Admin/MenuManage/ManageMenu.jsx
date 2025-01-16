import React, { useState } from "react";
import AddMenu from "./AddMenu";
import ViewMenu from "./ViewMenu";
import DashboardNavigater from "../DashboardNavigater";

const ManageMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle modal open/close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardNavigater />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Welcome Banner */}
        <div className="flex justify-between bg-gradient-to-r from-primary2 to-primary1 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold">Manage Menu</h2>
          <button
            onClick={toggleModal}
            className="text-2xl border border-white rounded-md p-2 font-bold hover:scale-105 transition-transform"
          >
            Add Menu
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="mt-10">
          {/* View Menu */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ViewMenu />
          </div>
        </div>
      </main>

      {/* Add Menu Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>
            <AddMenu />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMenu;

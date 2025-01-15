import React from "react";
import { Link } from "react-router-dom";
import ViewRooms from "./ViewRooms";
import AddRooms from "./AddRooms";
import DashboardNavigater from "../DashboardNavigater";

const ManageRooms = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
    <DashboardNavigater />

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

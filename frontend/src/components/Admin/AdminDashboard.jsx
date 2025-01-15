import React from "react";
import DashboardNavigater from "./DashboardNavigater";


const AdminDashboard = () => {
 

  return (
    <div className="flex h-screen">
     
         <DashboardNavigater />
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

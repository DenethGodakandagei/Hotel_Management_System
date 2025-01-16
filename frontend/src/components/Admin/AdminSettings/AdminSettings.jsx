import React from "react";
import DashboardNavigater from "../DashboardNavigater";
import { useAuth } from "../../../context/AuthContext.js";

const AdminSettings = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardNavigater />

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary2 to-primary1 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold">Admin Settings</h2>
          <p className="mt-2 text-lg">
            Manage your account, preferences, and platform configurations.
          </p>
        </div>

        {/* Account Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800">Account Information</h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Username:</span>
              <span className="font-medium text-gray-800">{user?.name || "John Doe"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-gray-800">{user?.email || "admin@example.com"}</span>
            </div>
          </div>
          <button className="mt-6 px-4 py-2 bg-primary1 text-white rounded-md shadow-md hover:bg-orange-600">
            Edit Profile
          </button>
        </div>

        {/* Preferences Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800">Preferences</h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Dark Mode:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-orange-500"></div>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Language:</span>
              <select className="bg-gray-100 border border-gray-300 text-gray-800 rounded-lg p-2">
                <option value="en">English</option>
                <option value="si">Sinhala</option>
                <option value="es">Spanish</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800">Security Settings</h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Two-Factor Authentication:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary1 rounded-full peer dark:bg-gray-700 peer-checked:bg-orange-500"></div>
              </label>
            </div>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600">
              Change Password
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
